import { company, promises, stats, values } from "@/lib/site";
import styles from "./Why.module.css";

const TILE_COLORS = [styles.lime, styles.blue, styles.pink];

function Tape({ items, className }: { items: string[]; className: string }) {
  // The list is rendered twice so the loop has no visible seam.
  const row = items.map((item) => (
    <span key={item}>
      {item} <b>✦</b>
    </span>
  ));
  return (
    <div className={`${styles.tape} ${className}`} aria-hidden>
      <div className={styles.run}>
        {row}
        {row}
      </div>
    </div>
  );
}

export default function Why() {
  return (
    <section id="about" className={`section ${styles.why}`} aria-labelledby="why-title">
      <div className={styles.tapes}>
        <Tape items={promises} className={styles.tapeLime} />
        <Tape items={["Web", "Apps", "Software", "SEO", "Google Ads", "Networks"]} className={styles.tapeBlue} />
      </div>

      <div className="page">
        <div className={styles.head}>
          <h2 id="why-title" className="label">
            Why we exist
          </h2>
          <p className="title" data-fx="words">
            Tech, made <em>approachable.</em>
          </p>
          <p className={styles.sub} data-fx="up">
            A team of {stats[2].value} people in {company.city} who handle the tech, so you can focus on what you do best.
          </p>
        </div>

        <div className={styles.bento}>
          {values.map((value, index) => (
            <article key={value.title} className={`${styles.tile} ${styles.value} ${TILE_COLORS[index]}`} data-fx="pop">
              <span className={styles.tag}>{value.title}</span>
              <p className={styles.quote}>“{value.quote}”</p>
              <p className={styles.text}>{value.text}</p>
            </article>
          ))}

          {stats.map((stat) => (
            <div key={stat.label} className={`${styles.tile} ${styles.stat}`} data-fx="pop">
              <span className={styles.number} data-fx="count">
                {stat.value}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}

          <div className={`${styles.tile} ${styles.cert}`} data-fx="pop">
            <span className={styles.badge}>ISO</span>
            <p>
              <strong>{company.certification}</strong>
              Certified quality process with a separate QA team testing every build.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
