"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";

const CV_URL = "/shavez_khan_CV.pdf";
const GITHUB_URL = "https://github.com/Shavezkhan0";
const LINKEDIN_URL = "https://www.linkedin.com/in/shavez-khan-1b8910163/";
const EMAIL = "shavez.khanccc@gmail.com";

const HEADLINE_FULL =
  "Building resilient distributed systems, cross-platform apps & AI workflows.";

// Words get individual entrance spans; the closing clause renders as its own
// indented line so the headline reads with an editorial two-beat rhythm.
const HEADLINE_WORDS: { text: string; accent?: boolean; block?: boolean }[] = [
  { text: "Building" },
  { text: "resilient" },
  { text: "distributed" },
  { text: "systems," },
  { text: "cross-platform" },
  { text: "apps" },
  { text: "&", accent: true, block: true },
  { text: "AI", accent: true },
  { text: "workflows.", accent: true },
];

const heroMeta = ["01 — Intro", "New Delhi, IN", "GMT+5:30"];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Master entrance timeline
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Editorial meta rail
      tl.from(".hero-meta-line", {
        y: 14,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
      });

      // Kicker + headline (per-word stagger)
      tl.from(
        ".hero-kicker",
        { y: 24, opacity: 0, duration: 0.8 },
        0.1
      );

      tl.from(
        ".hero-word",
        {
          y: 110,
          opacity: 0,
          rotationX: -90,
          stagger: 0.04,
          duration: 1.05,
          ease: "power4.out",
        },
        0.25
      );

      // Bio + CTAs + verified links
      tl.from(
        ".hero-bio",
        { y: 22, opacity: 0, duration: 0.8 },
        1.0
      );

      tl.from(
        ".hero-cta",
        { y: 26, opacity: 0, stagger: 0.1, duration: 0.7 },
        1.15
      );

      tl.from(
        ".hero-link",
        { y: 14, opacity: 0, stagger: 0.07, duration: 0.6 },
        1.3
      );

      // Scroll indicator fades out once the user starts scrolling
      const onScroll = () => {
        if (
          window.scrollY > 24 &&
          scrollRef.current &&
          scrollRef.current.style.opacity !== "0"
        ) {
          gsap.to(scrollRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              if (scrollRef.current)
                scrollRef.current.style.display = "none";
            },
          });
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => window.removeEventListener("scroll", onScroll);
    }, rootRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className="hero">
      <div className="hero-content">
        {/* Meta rail — editorial index */}
        <aside className="hero-meta" aria-hidden="true">
          {heroMeta.map((line) => (
            <span key={line} className="hero-meta-line">
              {line}
            </span>
          ))}
        </aside>

        <div>
          <p className="hero-kicker" aria-hidden="true">
            Shavez Khan — Full Stack Software Engineer
          </p>

          <h1 className="hero-headline" aria-label={HEADLINE_FULL}>
            {HEADLINE_WORDS.map((w) => (
              <span
                key={w.text}
                aria-hidden="true"
                className={`hero-word${
                  w.block ? " hero-accent-block" : w.accent ? " hero-accent" : ""
                }`}
              >
                {w.text}
              </span>
            ))}
          </h1>

          <p className="hero-bio">
            Full-stack engineer from New Delhi with 1+ years of production
            experience shipping ERP systems, cross-platform mobile apps and
            AI-driven workflows. I work across Flutter &amp; Dart, Next.js,
            Node.js and AWS — and I sweat the details that survive contact with
            real users.
          </p>

          <div className="hero-ctas">
            <a href="#work" className="hero-cta hero-cta--solid">
              Explore Production Work
            </a>
            <a
              href={CV_URL}
              download
              className="hero-cta"
            >
              Download CV
            </a>
          </div>

          <div className="hero-links">
            <span aria-hidden="true">Verified</span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              LinkedIn
            </a>
            <a href={`mailto:${EMAIL}`} className="hero-link">
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="hero-scroll-indicator" aria-hidden="true">
        <ChevronDown className="h-4 w-4" strokeWidth={2} />
      </div>
    </section>
  );
}