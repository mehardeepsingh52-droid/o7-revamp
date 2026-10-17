// Liquid: layered, domain-warped noise in three theme colours that swirls toward the cursor.
// Colours come from the site palette (see HeroShader). Kept cheap: four noise octaves, reduced resolution.
export const liquid = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec3 u_base;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform float u_vignette;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0, amp = 0.5;
  for (int i = 0; i < 4; i++) { value += amp * noise(p); p *= 2.02; amp *= 0.5; }
  return value;
}

void main() {
  float aspect = u_res.x / u_res.y;
  vec2 p = (gl_FragCoord.xy / u_res - 0.5) * vec2(aspect, 1.0);
  vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0);
  float t = u_time * 0.09;

  vec2 toMouse = m - p;
  p += toMouse * 0.35 * exp(-2.5 * dot(toMouse, toMouse));

  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 5.2));
  vec2 r = vec2(fbm(p * 1.2 + 3.5 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p * 1.2 + 3.5 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.1 + 3.0 * r);

  vec3 col = u_base;
  col = mix(col, u_c1, smoothstep(0.35, 0.9, f));
  col = mix(col, u_c2, smoothstep(0.55, 0.95, r.x) * 0.85);
  col = mix(col, u_c3, smoothstep(0.7, 1.0, f * q.y * 1.9) * 0.95);
  col = mix(col, u_c3, 0.25 * exp(-6.0 * length(m - p)));

  col *= mix(1.0, smoothstep(1.35, 0.15, length(p * vec2(0.75, 1.0))), u_vignette);
  gl_FragColor = vec4(col, 1.0);
}
`;
