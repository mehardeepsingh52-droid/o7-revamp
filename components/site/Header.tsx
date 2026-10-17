"use client";

import { useEffect, useRef, useState } from "react";
import { company, nav } from "@/lib/site";
import Button from "../shared/Button";
import { useHeaderScroll } from "../shared/useHeaderScroll";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<{ x: number; width: number } | null>(null);
  const scrolled = useHeaderScroll();
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Scroll spy: remember which section is crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setCurrent(`#${entry.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["#top", ...nav.map((item) => item.href)].forEach((id) => {
      const section = document.querySelector(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // The pill slides under the hovered link, or under the current section's link.
  const target = hovered ?? current;
  useEffect(() => {
    const link = target ? links.current[target] : null;
    setPill(link ? { x: link.offsetLeft, width: link.offsetWidth } : null);
  }, [target]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
      <a href="#top" className={`${styles.island} ${styles.logo}`} aria-label="O7 Solutions home" onClick={close}>
        <span className={styles.mark}>o7</span>
        <span className={styles.word}>solutions</span>
      </a>

      <nav className={`${styles.island} ${styles.nav}`} aria-label="Main" onMouseLeave={() => setHovered(null)}>
        <span
          className={styles.pill}
          style={pill ? { transform: `translateX(${pill.x}px)`, width: pill.width, opacity: 1 } : { opacity: 0 }}
          aria-hidden
        />
        {nav.map((item, index) => (
          <a
            key={item.href}
            ref={(el) => {
              links.current[item.href] = el;
            }}
            href={item.href}
            className={target === item.href ? styles.lit : ""}
            onMouseEnter={() => setHovered(item.href)}
          >
            <sup>0{index + 1}</sup>
            <span className={styles.roll}>
              <span data-text={item.label}>{item.label}</span>
            </span>
          </a>
        ))}
      </nav>

      <div className={`${styles.island} ${styles.actions}`}>
        <Button href="#contact" label="Request a quote" size="sm" className={styles.ctaLong} onClick={close} />
        <Button href="#contact" label="Quote" size="sm" className={styles.ctaShort} onClick={close} />
        <button className={styles.menu} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <span className={styles.burger} aria-hidden>
            <i />
            <i />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div id="mobile-menu" className={`${styles.sheet} ${open ? styles.open : ""}`}>
        <nav aria-label="Mobile">
          {nav.map((item, index) => (
            <a key={item.href} href={item.href} onClick={close} style={{ transitionDelay: `${open ? 80 + index * 50 : 0}ms` }}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <Button href="#contact" label="Request a quote" onClick={close} />
        <p>
          {company.phone} · {company.email}
        </p>
      </div>
    </header>
  );
}
