"use client";

import { useEffect, useRef, useState } from "react";
import ShaderCanvas, { type Uniforms } from "../shared/ShaderCanvas";
import { liquid } from "./shader";

// Fired on window whenever the site's colour variables change.
export const PALETTE_EVENT = "o7:palette";

function rgb(hex: string) {
  const n = parseInt(hex.trim().slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// Feeds the hero shader its colours from the theme variables, so the background always matches the palette.
export default function HeroShader() {
  const ref = useRef<HTMLDivElement>(null);
  const [uniforms, setUniforms] = useState<Uniforms | null>(null);

  useEffect(() => {
    function read() {
      const style = getComputedStyle(ref.current!);
      const base = rgb(style.getPropertyValue("--bg"));
      const light = base[0] * 0.2126 + base[1] * 0.7152 + base[2] * 0.0722 > 0.5;
      // On light backgrounds, soften the colours toward the background so dark text stays readable.
      const tone = (name: string) => rgb(style.getPropertyValue(name)).map((c, i) => (light ? c + (base[i] - c) * 0.45 : c));
      setUniforms({
        u_base: base,
        u_c1: tone("--accent-2"),
        u_c2: tone("--accent-3"),
        u_c3: tone("--accent"),
        u_vignette: light ? 0 : 1,
      });
    }
    read();
    window.addEventListener(PALETTE_EVENT, read);
    return () => window.removeEventListener(PALETTE_EVENT, read);
  }, []);

  return (
    <div ref={ref} style={{ display: "contents" }}>
      {uniforms && <ShaderCanvas fragment={liquid} uniforms={uniforms} />}
    </div>
  );
}
