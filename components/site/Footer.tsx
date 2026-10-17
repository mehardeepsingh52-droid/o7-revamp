import { company, nav, services, social } from "@/lib/site";
import { ArrowUp, ArrowUpRight } from "../shared/icons";
import styles from "./Footer.module.css";

const WORDMARK = "o7.solutions";

type FooterLink = { label: string; href: string; external?: boolean };

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title} className={styles.column}>
      <h2>{title}</h2>
      <ol>
        {links.map((link, index) => (
          <li key={link.label}>
            <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener" : undefined}>
              <span className={styles.num}>0{index + 1}</span>
              <span className={styles.roll}>
                <span data-text={link.label}>{link.label}</span>
              </span>
              <ArrowUpRight size={16} />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function Footer() {
  const { lat, lng } = company.geo;

  return (
    <footer className={styles.footer}>
      <div className={`page ${styles.top}`}>
        <div className={styles.brand}>
          <span className={styles.mark}>o7</span>
          <p>
            Websites, apps, business software and marketing, built by one team in {company.city}, {company.region}.
          </p>
          <span className={styles.badge}>
            <i /> {company.certification} certified
          </span>
        </div>

        <div className={styles.reach}>
          <span className="label">Say hello</span>
          <a href={`mailto:${company.email}`} className={styles.email}>
            {company.email}
          </a>
          <div className={styles.phones}>
            <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
            <a href={`tel:${company.phoneAlt.replace(/\s/g, "")}`}>{company.phoneAlt}</a>
          </div>
        </div>
      </div>

      <div className={`page ${styles.links}`} data-fx="stagger">
        <LinkColumn title="Services" links={services.map((service) => ({ label: service.title, href: `/${service.slug}` }))} />
        <LinkColumn title="Company" links={nav} />
        <LinkColumn title="Follow" links={social.map((item) => ({ ...item, external: true }))} />
      </div>

      {/* Outlined giant wordmark; each letter lights up and jumps on hover */}
      <p className={styles.wordmark} aria-hidden data-fx="stagger">
        {[...WORDMARK].map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </p>

      <div className={`page ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} O7 Solutions</span>
        <span>
          {company.city}, {company.region} · {lat.toFixed(2)}° N, {lng.toFixed(2)}° E
        </span>
        <span className={styles.note}>Psst… type o7 anywhere on this page.</span>
        <a href="#top" className={styles.toTop}>
          Back to top
          <span>
            <ArrowUp size={16} />
          </span>
        </a>
      </div>
    </footer>
  );
}
