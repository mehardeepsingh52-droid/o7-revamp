import { testimonials, type Testimonial } from "@/lib/site";
import Button from "../shared/Button";
import { Star } from "../shared/icons";
import styles from "./Testimonials.module.css";

const AVATAR_COLORS = ["var(--accent)", "var(--accent-2)", "var(--accent-3)", "var(--accent-4)", "var(--text)"];
const AVATAR_INKS = ["var(--on-accent)", "var(--on-accent-2)", "var(--on-accent-3)", "var(--bg)", "var(--bg)"];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

function Review({ review, index }: { review: Testimonial; index: number }) {
  return (
    <figure className={styles.card} data-fx="up">
      {review.video ? (
        <video className={styles.video} src={review.video} controls preload="metadata" />
      ) : (
        <div className={styles.stars} aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={22} />
          ))}
        </div>
      )}
      <blockquote>“{review.quote}”</blockquote>
      <figcaption>
        <span className={styles.avatar} style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length], color: AVATAR_INKS[index % AVATAR_INKS.length] }}>
          {initials(review.name)}
        </span>
        <span>
          <strong>{review.name}</strong>
          <span>{review.project}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function NextStory() {
  return (
    <div className={styles.next} data-fx="up">
      <p>Your project could be our next story.</p>
      <Button href="#contact" label="Request a quote" />
    </div>
  );
}

export default function Testimonials() {
  const tiles = testimonials.map((review, index) => <Review key={review.name} review={review} index={index} />);
  tiles.splice(2, 0, <NextStory key="next" />);

  // Alternate tiles between two columns; the right one sits lower for a staggered look.
  const left = tiles.filter((_, i) => i % 2 === 0);
  const right = tiles.filter((_, i) => i % 2 === 1);

  return (
    <section id="reviews" className="section" aria-labelledby="reviews-title">
      <div className="page">
        <div className={styles.head}>
          <h2 id="reviews-title" className="title" data-fx="words">
            What clients
            <br />
            are <em>saying</em>
          </h2>
          <span className="label">Client reviews</span>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>{left}</div>
          <div className={`${styles.column} ${styles.offset}`}>{right}</div>
        </div>
      </div>
    </section>
  );
}
