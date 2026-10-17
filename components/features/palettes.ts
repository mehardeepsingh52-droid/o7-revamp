// Colour palettes for PaletteSwitcher. Once one is picked, copy its values into the tokens
// at the top of app/site.css and remove the switcher.

export type Palette = {
  name: string;
  light?: boolean;
  bg: string;
  surface: string;
  card: string;
  text: string;
  muted: string;
  dim: string;
  accent: string;
  onAccent: string;
  accent2: string;
  onAccent2: string;
  accent3: string;
  onAccent3: string;
  accent4: string;
};

export const palettes: Palette[] = [
  { name: "Neon Night", bg: "#07080a", surface: "#0e1013", card: "#15181d", text: "#f2f4ee", muted: "#9aa0a6", dim: "#5e646b",
    accent: "#c8ff2e", onAccent: "#0b0d06", accent2: "#2f6bff", onAccent2: "#ffffff", accent3: "#ff4d8d", onAccent3: "#ffffff", accent4: "#3be8ff" },
  { name: "Ocean Mint", bg: "#06100f", surface: "#0b1716", card: "#10201e", text: "#eaf6f2", muted: "#8fa8a2", dim: "#536a65",
    accent: "#3dffb5", onAccent: "#04130d", accent2: "#1e90ff", onAccent2: "#ffffff", accent3: "#ffd23f", onAccent3: "#1a1400", accent4: "#7df9ff" },
  { name: "Cyber Yellow", bg: "#0a0a0a", surface: "#121212", card: "#1a1a1a", text: "#f5f5f0", muted: "#a3a39b", dim: "#63635c",
    accent: "#ffe600", onAccent: "#121000", accent2: "#00c2ff", onAccent2: "#00131a", accent3: "#ff3d5a", onAccent3: "#ffffff", accent4: "#9dff00" },
  { name: "Ice & Cobalt", bg: "#070a12", surface: "#0c1220", card: "#111a2c", text: "#e8eefc", muted: "#8b97b3", dim: "#525d78",
    accent: "#5cf2ff", onAccent: "#031216", accent2: "#2f5bff", onAccent2: "#ffffff", accent3: "#ff5c7a", onAccent3: "#ffffff", accent4: "#9bb8ff" },
  { name: "Forest Gold", bg: "#07100c", surface: "#0c1a13", card: "#11231a", text: "#f0ece0", muted: "#a2a596", dim: "#646a5c",
    accent: "#d9b26f", onAccent: "#1a1206", accent2: "#2e8b67", onAccent2: "#ffffff", accent3: "#f0d7a2", onAccent3: "#1a1206", accent4: "#7fd1a8" },
  { name: "Rose Noir", bg: "#0d0709", surface: "#170c10", card: "#201217", text: "#fbeef1", muted: "#b6959e", dim: "#74585f",
    accent: "#ff5c8a", onAccent: "#1a0509", accent2: "#ff9eb5", onAccent2: "#1a0509", accent3: "#ffd6a5", onAccent3: "#1a0d05", accent4: "#ff3d6e" },
  { name: "Monochrome Red", bg: "#0a0a0a", surface: "#131313", card: "#1a1a1a", text: "#f4f4f4", muted: "#9e9e9e", dim: "#5f5f5f",
    accent: "#ffffff", onAccent: "#0a0a0a", accent2: "#ff3b30", onAccent2: "#ffffff", accent3: "#8e8e93", onAccent3: "#ffffff", accent4: "#ff3b30" },
  { name: "Lime on Navy", bg: "#060b1a", surface: "#0b1430", card: "#101c3d", text: "#eef2ff", muted: "#93a0c4", dim: "#56628a",
    accent: "#b8ff3b", onAccent: "#0b1400", accent2: "#3d7bff", onAccent2: "#ffffff", accent3: "#ff4d8d", onAccent3: "#ffffff", accent4: "#3be8ff" },
  { name: "Daylight", light: true, bg: "#f4f1ea", surface: "#ebe7de", card: "#ffffff", text: "#141414", muted: "#5d5a54", dim: "#8f8a80",
    accent: "#3448ff", onAccent: "#ffffff", accent2: "#c6f432", onAccent2: "#141414", accent3: "#ff8fbd", onAccent3: "#141414", accent4: "#19c98a" },
  { name: "Paper & Ink", light: true, bg: "#fafaf7", surface: "#f0efe9", card: "#ffffff", text: "#0d0d0d", muted: "#55524b", dim: "#8c887f",
    accent: "#ff3b30", onAccent: "#ffffff", accent2: "#0d0d0d", onAccent2: "#fafaf7", accent3: "#2b4cff", onAccent3: "#ffffff", accent4: "#ffd23f" },
];

export function paletteTokens(palette: Palette): Record<string, string> {
  const line = palette.light ? "0 0 0" : "255 255 255";
  return {
    "--bg": palette.bg,
    "--surface": palette.surface,
    "--card": palette.card,
    "--text": palette.text,
    "--muted": palette.muted,
    "--dim": palette.dim,
    "--line": `rgb(${line} / 0.08)`,
    "--line-strong": `rgb(${line} / 0.16)`,
    "--accent": palette.accent,
    "--on-accent": palette.onAccent,
    "--accent-2": palette.accent2,
    "--on-accent-2": palette.onAccent2,
    "--accent-3": palette.accent3,
    "--on-accent-3": palette.onAccent3,
    "--accent-4": palette.accent4,
    "--sheet-shadow": palette.light ? "rgb(0 0 0 / 0.12)" : "rgb(0 0 0 / 0.85)",
  };
}
