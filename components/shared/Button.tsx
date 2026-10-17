import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

type Props = {
  label: string;
  href?: string;
  variant?: "primary" | "ghost";
  size?: "sm";
  icon?: "up-right" | "right";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
};

// Each letter sits in its own clip and rolls up on hover, staggered by --i. The copy that rolls in
// comes from CSS (data-c), so the markup stays one span per letter.
function RollingLabel({ text }: { text: string }) {
  return (
    <span className="btn-text" aria-hidden>
      {[...text].map((char, i) => {
        const shown = char === " " ? " " : char;
        return (
          <span key={i} className="btn-char" data-c={shown} style={{ "--i": i } as CSSProperties}>
            {shown}
          </span>
        );
      })}
    </span>
  );
}

export default function Button({ label, href, variant = "primary", size, icon = "up-right", type = "button", className = "", onClick }: Props) {
  const Icon = icon === "right" ? ArrowRight : ArrowUpRight;
  const classes = [variant === "ghost" ? "btn-ghost" : "btn", size === "sm" ? "btn-sm" : "", className].filter(Boolean).join(" ");
  const content = (
    <>
      <RollingLabel text={label} />
      {/* Two arrows: on hover the first flies out and the second flies in */}
      <span className="btn-icon" aria-hidden>
        <Icon size={18} />
        <Icon size={18} />
      </span>
    </>
  );

  return href ? (
    <a href={href} className={classes} aria-label={label} onClick={onClick}>
      {content}
    </a>
  ) : (
    <button type={type} className={classes} aria-label={label} onClick={onClick}>
      {content}
    </button>
  );
}
