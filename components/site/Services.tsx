"use client";

import { useState, type CSSProperties } from "react";
import { services } from "@/lib/site";
import { ArrowUpRight } from "../shared/icons";
import styles from "./Services.module.css";

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="page">
        <div className={styles.head}>
          <h2 id="services-title" className="title" data-fx="chars">
            Services
          </h2>
          <span className="label">Hover or tap a strip</span>
        </div>

        <div className={styles.strips} data-fx="up">
          {services.map((service, index) => {
            const isActive = index === active;
            // Each strip takes its colours from the theme: --panel-1 ... --panel-5.
            const colours = { "--strip": `var(--panel-${index + 1})`, "--strip-ink": `var(--panel-${index + 1}-ink)` } as CSSProperties;
            return (
              <article
                key={service.slug}
                className={`${styles.strip} ${isActive ? styles.active : ""}`}
                style={colours}
                onMouseEnter={() => setActive(index)}
              >
                <button
                  className={styles.tab}
                  aria-expanded={isActive}
                  aria-controls={`strip-${service.slug}`}
                  onClick={() => setActive(index)}
                >
                  <span className={styles.number}>({String(index + 1).padStart(2, "0")})</span>
                  <span className={styles.tabTitle}>{service.title}</span>
                </button>

                <div id={`strip-${service.slug}`} className={styles.body}>
                  <div className={styles.text}>
                    <span className={styles.number}>({String(index + 1).padStart(2, "0")})</span>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <ul>
                      {service.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <a href={`/${service.slug}`} className={styles.more}>
                      More about {service.title.toLowerCase()} <ArrowUpRight size={18} />
                    </a>
                  </div>
                  <img src={service.visual} alt="" width={480} height={300} loading="lazy" className={styles.visual} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
