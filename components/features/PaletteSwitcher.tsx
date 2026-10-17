"use client";

// Sidebar for trying colour palettes live. Remove it (and palettes.ts) once a palette is chosen.

import { useEffect, useState } from "react";
import { PALETTE_EVENT } from "../site/HeroShader";
import { palettes, paletteTokens } from "./palettes";
import styles from "./PaletteSwitcher.module.css";

const STORAGE_KEY = "o7-palette";

function apply(index: number) {
  const site = document.querySelector<HTMLElement>(".site");
  if (!site) return;
  for (const [name, value] of Object.entries(paletteTokens(palettes[index]))) site.style.setProperty(name, value);
  document.body.style.background = palettes[index].bg;
  window.dispatchEvent(new Event(PALETTE_EVENT));
}

export default function PaletteSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  // Restore the last palette picked in this browser.
  useEffect(() => {
    let saved = 0;
    try {
      saved = Number(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch {}
    if (saved > 0 && saved < palettes.length) {
      setActive(saved);
      apply(saved);
    }
  }, []);

  function choose(index: number) {
    setActive(index);
    apply(index);
    try {
      localStorage.setItem(STORAGE_KEY, String(index));
    } catch {}
  }

  const current = palettes[active];

  return (
    <aside className={`${styles.switcher} ${open ? styles.open : ""}`} aria-label="Colour palettes (temporary)">
      <button className={styles.toggle} onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className={styles.mini}>
          {[current.accent, current.accent2, current.accent3].map((colour) => (
            <i key={colour} style={{ background: colour }} />
          ))}
        </span>
        <span className={styles.toggleLabel}>{open ? "Close" : "Palettes"}</span>
      </button>

      <div className={styles.panel}>
        <p className={styles.note}>Temporary · tap to preview live</p>
        <ul>
          {palettes.map((palette, index) => (
            <li key={palette.name}>
              <button className={index === active ? styles.current : ""} onClick={() => choose(index)} aria-pressed={index === active}>
                <span className={styles.swatch} style={{ background: palette.bg }}>
                  {[palette.accent, palette.accent2, palette.accent3, palette.accent4].map((colour, i) => (
                    <i key={i} style={{ background: colour }} />
                  ))}
                </span>
                <span className={styles.name}>
                  {palette.name}
                  <small>
                    {String(index + 1).padStart(2, "0")} · {palette.light ? "Light" : "Dark"}
                  </small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
