"use client";

import { useEffect } from "react";
import gsap from "gsap";

const PIECES = 70;
const COLORS = ["var(--accent)", "var(--accent-2)", "var(--accent-3)", "var(--accent-4)"];

// Easter egg: typing "o7" (internet shorthand for a salute) fires confetti and a salute back.
export default function SaluteEgg() {
  useEffect(() => {
    let typed = "";

    function celebrate() {
      const host = document.querySelector(".site") ?? document.body;
      const layer = document.createElement("div");
      layer.setAttribute("aria-hidden", "true");
      layer.style.cssText = "position:fixed;inset:0;z-index:1000;pointer-events:none;overflow:hidden";
      host.append(layer);

      const salute = document.createElement("div");
      salute.textContent = "o7";
      salute.style.cssText =
        "position:absolute;left:50%;top:42%;font:900 22vw/1 var(--font-display);color:var(--accent);text-shadow:0 0 60px var(--accent-glow,transparent)";
      layer.append(salute);
      gsap.fromTo(salute, { xPercent: -50, yPercent: -50, scale: 0.2, rotate: -20 }, { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2)" });
      gsap.to(salute, { opacity: 0, scale: 1.3, delay: 1.1, duration: 0.5 });

      for (let i = 0; i < PIECES; i++) {
        const piece = document.createElement("i");
        piece.style.cssText = `position:absolute;left:50%;top:45%;width:9px;height:15px;border-radius:2px;background:${COLORS[i % COLORS.length]}`;
        layer.append(piece);
        gsap
          .timeline()
          .to(piece, {
            x: gsap.utils.random(-0.48, 0.48) * window.innerWidth,
            y: gsap.utils.random(-0.45, 0.1) * window.innerHeight,
            rotate: gsap.utils.random(-540, 540),
            duration: 0.8,
            ease: "power3.out",
          })
          .to(piece, { y: window.innerHeight * 0.7, opacity: 0, duration: gsap.utils.random(1, 1.8), ease: "power1.in" });
      }

      setTimeout(() => layer.remove(), 3000);
    }

    function onKey(event: KeyboardEvent) {
      if ((event.target as Element).closest("input, textarea, select")) return;
      typed = (typed + event.key.toLowerCase()).slice(-2);
      if (typed === "o7") celebrate();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
