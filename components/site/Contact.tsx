"use client";

import { useState } from "react";
import { company, services } from "@/lib/site";
import { enquiryMailto } from "@/lib/enquiry";
import Button from "../shared/Button";
import { ArrowUpRight } from "../shared/icons";
import styles from "./Contact.module.css";

const channels = [
  { label: "Call", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` },
  { label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${company.whatsapp}` },
  { label: "Email", value: company.email, href: `mailto:${company.email}` },
  { label: "Visit", value: `${company.city}, ${company.region}`, href: company.mapsUrl },
];

const options = [...services.map((service) => service.title), "Something else"];

// The form reads like a short letter: the visitor fills in the blanks and picks what they need.
export default function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = enquiryMailto(event.currentTarget);
    setSent(true);
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="page">
        <div className={styles.head}>
          <span className="label">Start a project</span>
          <h2 id="contact-title" className="title" data-fx="words">
            Let’s build something <em>good.</em>
          </h2>
        </div>

        <form className={styles.letter} onSubmit={onSubmit} data-fx="up">
          <p className={styles.line}>
            Hi O7, I’m{" "}
            <input name="name" required autoComplete="name" placeholder="your name" aria-label="Your name" />{" "}
            and I need help with
          </p>

          <fieldset className={styles.chips}>
            <legend className="sr-only">What do you need?</legend>
            {options.map((option, index) => (
              <label key={option}>
                <input type="radio" name="service" value={option} defaultChecked={index === 0} />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>

          <p className={styles.line}>
            Reach me at{" "}
            <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" aria-label="Email" /> or
            call{" "}
            <input name="phone" type="tel" autoComplete="tel" placeholder="+91 (optional)" aria-label="Phone (optional)" />.
          </p>

          <p className={styles.line}>Here’s the idea:</p>
          <textarea
            name="message"
            required
            rows={3}
            placeholder="What are you building, and by when?"
            aria-label="About your project"
          />

          <div className={styles.send}>
            <Button type="submit" label="Send enquiry" icon="right" />
            <p aria-live="polite">
              {sent
                ? `Your email app should now open with the message ready. Nothing opened? Write to ${company.email}.`
                : "Sending opens your email app with everything filled in."}
            </p>
          </div>
        </form>

        <ul className={styles.channels} data-fx="stagger">
          {channels.map((channel, index) => (
            <li key={channel.label}>
              <a href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel="noopener">
                <span className={styles.index}>0{index + 1}</span>
                <span className={styles.channelLabel}>{channel.label}</span>
                <span className={styles.channelValue}>{channel.value}</span>
                <span className={styles.arrow} aria-hidden>
                  <ArrowUpRight size={20} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
