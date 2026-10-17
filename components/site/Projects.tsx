"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { projects } from "@/lib/site";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "../shared/icons";
import styles from "./Projects.module.css";

const SLIDE_MS = 6000;

export default function Projects() {
  const count = projects.length;
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0); // slides dragged so far, can be fractional
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const stage = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = (index: number) => setActive((index + count) % count);
  // The timer keeps running while the page scrolls; only the pause button or a drag stops it.
  const autoplay = !reducedMotion && !paused && drag === 0;
  const timing = { animationDuration: `${SLIDE_MS}ms`, animationPlayState: autoplay ? "running" : "paused" } as const;

  // Distance of a slide from the centre, wrapped so the carousel loops both ways.
  function offsetOf(index: number) {
    let offset = index - active;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset + drag;
  }

  function slideStyle(index: number): CSSProperties {
    const offset = offsetOf(index);
    const distance = Math.abs(offset);
    return {
      transform: `translateX(${offset * 60}%) translateZ(${-distance * 200}px) rotateY(${offset * -24}deg)`,
      opacity: distance > 2.2 ? 0 : 1,
      zIndex: 100 - Math.round(distance * 10),
      ["--shade" as string]: Math.min(distance, 1),
    };
  }

  function onPointerDown(event: React.PointerEvent) {
    dragStartX.current = event.clientX;
    dragged.current = false;
  }

  function onPointerMove(event: React.PointerEvent) {
    if (dragStartX.current === null || !stage.current) return;
    const dx = event.clientX - dragStartX.current;
    if (!dragged.current && Math.abs(dx) > 6) {
      dragged.current = true;
      stage.current.setPointerCapture(event.pointerId);
    }
    if (dragged.current) setDrag(dx / (stage.current.clientWidth * 0.5));
  }

  function onPointerUp() {
    if (dragStartX.current === null) return;
    dragStartX.current = null;
    const steps = Math.abs(drag) < 0.5 && Math.abs(drag) > 0.12 ? Math.sign(drag) : Math.round(drag);
    go(active - steps);
    setDrag(0);
  }

  function onCardClick(event: React.MouseEvent, index: number) {
    if (dragged.current) {
      event.preventDefault();
      dragged.current = false;
    } else if (index !== active) {
      event.preventDefault();
      go(index);
    }
  }

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className={`page ${styles.head}`}>
        <h2 id="projects-title" className="title" data-fx="chars">
          Projects
        </h2>
        <div className={styles.intro} data-fx="up">
          <span className="label">{String(count).padStart(2, "0")} live client sites</span>
          <p>Real websites we built for schools, stores and startups. Every one is live, so go poke around.</p>
        </div>
      </div>

      <div
        className={styles.carousel}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client websites"
        data-fx="up"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(active - 1);
          if (e.key === "ArrowRight") go(active + 1);
        }}
      >
        <button className={`${styles.arrow} ${styles.prev}`} onClick={() => go(active - 1)} aria-label="Previous project">
          <ChevronLeft />
        </button>

        <div
          ref={stage}
          className={`${styles.stage} ${drag !== 0 ? styles.dragging : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {projects.map((project, index) => {
            const isActive = index === active;
            return (
              <div
                key={project.url}
                className={`${styles.slide} ${isActive ? styles.active : ""}`}
                style={slideStyle(index)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}: ${project.name}`}
                aria-hidden={!isActive}
              >
                <a
                  className={styles.card}
                  href={project.url}
                  target="_blank"
                  rel="noopener"
                  tabIndex={isActive ? 0 : -1}
                  onClick={(e) => onCardClick(e, index)}
                  draggable={false}
                >
                  <div className={styles.inner}>
                    <div className={styles.media}>
                      <Image
                        src={project.image}
                        alt={`${project.name} website homepage`}
                        sizes="(max-width: 860px) 90vw, 760px"
                        placeholder="blur"
                        draggable={false}
                        priority={index === 0}
                      />
                      <span className={styles.url}>
                        <i />
                        {new URL(project.url).hostname}
                      </span>
                      <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <div className={styles.body}>
                      <div className={styles.titleRow}>
                        <div>
                          <span className={styles.category}>{project.category}</span>
                          <h3>{project.name}</h3>
                        </div>
                        <span className={styles.visit} aria-hidden>
                          <ArrowUpRight size={22} />
                        </span>
                      </div>
                      <p>{project.summary}</p>
                      <ul className={styles.tags}>
                        {project.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        <button className={`${styles.arrow} ${styles.next}`} onClick={() => go(active + 1)} aria-label="Next project">
          <ChevronRight />
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.pager}>
          {projects.map((project, index) => (
            <button
              key={project.url}
              className={index === active ? styles.current : ""}
              onClick={() => go(index)}
              aria-label={`Show ${project.name}`}
              aria-current={index === active}
            />
          ))}
        </div>

        <div className={styles.timer}>
          <span className={styles.counter}>
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <div className={styles.track}>
            {reducedMotion ? (
              <span className={styles.fill} />
            ) : (
              <Fragment key={active}>
                <span className={`${styles.fill} ${styles.grow}`} style={timing} onAnimationEnd={() => go(active + 1)} />
                <span className={styles.lane} style={timing} />
              </Fragment>
            )}
          </div>
          {!reducedMotion && (
            <button className={styles.toggle} onClick={() => setPaused(!paused)} aria-label={paused ? "Resume slideshow" : "Pause slideshow"}>
              {paused ? <Play size={12} /> : <Pause size={12} />}
            </button>
          )}
        </div>

        <p className={styles.hint}>Drag to swivel · Click a site to open it</p>
      </div>
    </section>
  );
}
