"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "back.out(1.7)";
const DURATION = 1;
const DISTANCE = 80;

/*
  Scroll animations for any element with a data-fx attribute:
    up       slides up and fades in
    pop      scales in with a twist
    words    reveals text word by word, each line masked
    chars    reveals text letter by letter
    stagger  animates the element's children one after another
    count    counts the leading number up from zero ("200+" -> 0..200 then "+")
  Every reveal replays in reverse when it leaves the screen, so scrolling up animates too.
  Scrolling itself is the browser's own (no smooth-scroll library), which keeps it fast.
*/
export default function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const on = (trigger: Element) => ({
        trigger,
        start: "top 88%",
        end: "bottom 8%",
        toggleActions: "play reverse play reverse",
      });

      gsap.utils.toArray<HTMLElement>("[data-fx]").forEach((el) => {
        const fx = el.dataset.fx;

        if (fx === "up") {
          gsap.from(el, { y: DISTANCE, opacity: 0, duration: DURATION, ease: EASE, scrollTrigger: on(el) });
        } else if (fx === "pop") {
          gsap.from(el, {
            scale: 0.4,
            rotate: gsap.utils.random(-14, 14),
            opacity: 0,
            duration: DURATION,
            ease: "back.out(2.2)",
            scrollTrigger: on(el),
          });
        } else if (fx === "words" || fx === "chars") {
          const split = SplitText.create(el, { type: fx === "words" ? "words,lines" : "words,chars,lines", mask: "lines" });
          gsap.from(fx === "words" ? split.words : split.chars, {
            yPercent: 110,
            rotate: fx === "chars" ? 8 : 0,
            duration: DURATION,
            ease: EASE,
            stagger: fx === "words" ? 0.035 : 0.018,
            scrollTrigger: on(el),
          });
        } else if (fx === "stagger") {
          gsap.from(el.children, { y: DISTANCE, opacity: 0, duration: DURATION, ease: EASE, stagger: 0.09, scrollTrigger: on(el) });
        } else if (fx === "count") {
          // Keep the real value on the element: the counter rewrites the text, and effects can run twice in dev.
          const original = el.dataset.value ?? el.textContent ?? "";
          el.dataset.value = original;
          const [, number, rest] = original.match(/^(\d+)(.*)$/) ?? [];
          if (!number) return;
          const counter = { value: 0 };
          gsap.to(counter, {
            value: Number(number),
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => (el.textContent = Math.round(counter.value) + rest),
            scrollTrigger: on(el),
          });
        }
      });
    });

    // Web fonts change line wraps and page height, so measure trigger positions again once they load.
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return null;
}
