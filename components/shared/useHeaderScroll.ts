"use client";

import { useEffect, useState } from "react";

// True once the page has scrolled off the top. Only changes when it flips, so the header doesn't
// re-render on every scroll event.
export function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}
