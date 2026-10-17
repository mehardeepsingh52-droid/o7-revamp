"use client";

import { useEffect, useRef } from "react";

export type Uniforms = Record<string, number | number[]>;

const VERTEX = "attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }";

// The shader is soft and blurry, so drawing it at half the CSS size (and letting the browser scale it up)
// looks the same while costing a fraction of the GPU time. Same idea for the frame cap.
const RESOLUTION = 0.5;
const MAX_WIDTH = 960;
const FRAME_MS = 1000 / 40;

/*
  Draws a full-screen fragment shader. The shader receives:
    u_time  seconds since start
    u_res   canvas size in pixels
    u_mouse pointer position, 0..1 from bottom-left, eased
  plus any `uniforms` passed in (numbers become floats, arrays of 3 become vec3s). Changing them
  updates the running shader without rebuilding it.
  It pauses off-screen and renders a single still frame for reduced motion.
*/
export default function ShaderCanvas({ fragment, uniforms, className }: { fragment: string; uniforms: Uniforms; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const applyUniforms = useRef<(values: Uniforms) => void>(() => {});

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!canvas || !gl) return;

    const program = gl.createProgram()!;
    for (const [type, source] of [
      [gl.VERTEX_SHADER, VERTEX],
      [gl.FRAGMENT_SHADER, "precision highp float;\n" + fragment],
    ] as const) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(shader));
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    gl.useProgram(program);

    // One triangle that covers the whole screen.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frame = 0;
    let lastDraw = 0;
    let visible = true;

    applyUniforms.current = (values) => {
      for (const [name, value] of Object.entries(values)) {
        const location = gl.getUniformLocation(program, name);
        if (typeof value === "number") gl.uniform1f(location, value);
        else gl.uniform3fv(location, value);
      }
      draw(performance.now());
    };
    applyUniforms.current(uniforms);

    function resize() {
      const scale = Math.min(RESOLUTION, MAX_WIDTH / canvas!.clientWidth);
      canvas!.width = Math.round(canvas!.clientWidth * scale);
      canvas!.height = Math.round(canvas!.clientHeight * scale);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      draw(performance.now());
    }

    function draw(now: number) {
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      gl!.uniform1f(uTime, (now - start) / 1000);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      lastDraw = now;
    }

    function loop(now: number) {
      if (now - lastDraw >= FRAME_MS) draw(now);
      frame = requestAnimationFrame(loop);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.targetX = (event.clientX - rect.left) / rect.width;
      mouse.targetY = 1 - (event.clientY - rect.top) / rect.height;
    }

    const resizer = new ResizeObserver(resize);
    resizer.observe(canvas);
    const watcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !reduced) frame = requestAnimationFrame(loop);
    });
    watcher.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resizer.disconnect();
      watcher.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [fragment]);

  // Palette changes only swap colours; the WebGL setup above stays as it is.
  useEffect(() => applyUniforms.current(uniforms), [uniforms]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
