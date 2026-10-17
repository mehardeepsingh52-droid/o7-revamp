import type { CSSProperties } from "react";
import { company, stats } from "@/lib/site";
import Button from "../shared/Button";
import HeroShader from "./HeroShader";
import styles from "./Hero.module.css";

// Polygon for a spiky "sticker" edge, used as a clip-path.
function burst(spikes: number, depth: number) {
  const points = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 50 : 50 * depth;
    const angle = (Math.PI * i) / spikes;
    points.push(`${(50 + r * Math.cos(angle)).toFixed(2)}% ${(50 + r * Math.sin(angle)).toFixed(2)}%`);
  }
  return `polygon(${points.join(",")})`;
}

const wavy = burst(28, 0.88);
const seal = burst(18, 0.9);

function Sticker({ children, className }: { children: string; className: string }) {
  return (
    <span className={`${styles.sticker} ${className}`} aria-hidden>
      <span style={{ "--shape": wavy } as CSSProperties}>{children}</span>
    </span>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className={styles.mask}>
      <span className={styles.word} style={{ animationDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.backdrop} aria-hidden>
        <HeroShader />
      </div>
      <div className={styles.grain} aria-hidden />
      <div className={styles.fade} aria-hidden />

      <div className={`page ${styles.inner}`}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} />
          {company.certification} certified · {company.city}, {company.region}
        </p>

        <h1 className={styles.title}>
          <span className={styles.line}>
            <Line delay={100}>Own your</Line>
            <Sticker className={styles.web}>Websites</Sticker>
          </span>
          <span className={styles.line}>
            <span className={styles.seal} aria-hidden>
              <span className={styles.sealBg} style={{ "--shape": seal } as CSSProperties} />
              <svg className={styles.sealText} viewBox="0 0 100 100">
                <path id="seal-path" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" fill="none" />
                <text>
                  <textPath href="#seal-path">ISO 9001:2015 • Jalandhar • Punjab •</textPath>
                </text>
              </svg>
              <span className={styles.sealMark}>o7</span>
            </span>
            <Line delay={220}>Digital</Line>
            <Sticker className={styles.apps}>Apps</Sticker>
          </span>
          <span className={styles.line}>
            <Line delay={340}>Edge.</Line>
            <Sticker className={styles.software}>Software</Sticker>
          </span>
        </h1>

        <div className={styles.foot}>
          <p className={styles.lead}>
            Websites, mobile apps and business software, designed, built and marketed by one team in{" "}
            {company.city}.
          </p>
          <div className={styles.ctas}>
            <Button href="#contact" label="Request a quote" />
            <Button href="#projects" label="See projects" variant="ghost" icon="right" />
          </div>
        </div>
      </div>

      <dl className={`page ${styles.stats}`}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
