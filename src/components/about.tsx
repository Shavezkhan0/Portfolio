"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LABEL = "ABOUT ME";
const HEADING = "Building digital experiences that matter";
const SUMMARY =
  "Full stack software engineer with 1+ years of hands-on experience building production-ready web, mobile, ERP, and REST API applications. Experienced in Flutter and Dart for cross-platform mobile application development, along with React.js, Next.js, TypeScript, JavaScript, Node.js, Express.js, Python, and SQL. Experienced in developing admin and employee web applications, mobile applications, REST API integrations, authentication systems, role-based access control, database-driven applications, API testing, workflow automation, and AWS deployment.";
const SUMMARY_WORDS = SUMMARY.split(" ");
const FACTS = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "LeetCode Problems" },
  { value: 15, suffix: "+", label: "UI Modules Built" },
];
const SCRAMBLE_SYMBOLS = "!<>-_\\/[]{}—=+*^?#".split("");

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);

  const handlePolaroidEnter = useCallback(() => {
    const el = polaroidRef.current;
    if (!el || reducedMotionRef.current) return;
    gsap.to(el, { rotation: 0, scale: 1.02, duration: 0.4, ease: "power2.out" });
  }, []);

  const handlePolaroidLeave = useCallback(() => {
    const el = polaroidRef.current;
    if (!el || reducedMotionRef.current) return;
    const tilt = parseFloat(el.dataset.rotation || "-3");
    gsap.to(el, { rotation: tilt, scale: 1, duration: 0.4, ease: "power2.out" });
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const polaroid = polaroidRef.current;
    if (!section) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = prefersReducedMotion;

    // Anti-AI: random polaroid tilt, persisted in a data attribute
    if (polaroid) {
      const randomTilt = -(Math.random() * 4 + 1); // between -5 and -1
      polaroid.dataset.rotation = randomTilt.toFixed(2);
    }

    const ctx = gsap.context(() => {
      const restingTilt = polaroid
        ? parseFloat(polaroid.dataset.rotation || "-3")
        : -3;

      if (prefersReducedMotion) {
        gsap.set(".about-label", { x: 0, opacity: 1 });
        gsap.set(".about-summary-word", { y: 0, opacity: 1 });
        gsap.set(".about-line", { scaleY: 1 });
        if (polaroid) gsap.set(polaroid, { rotation: 0, y: 0, yPercent: 0, scale: 1 });
        gsap.utils.toArray<HTMLElement>(".about-fact-value").forEach((el) => {
          el.textContent = `${el.dataset.target || "0"}${el.dataset.suffix || ""}`;
        });
        return;
      }

      // 1. Section label — fade in + slide from left
      gsap.fromTo(
        ".about-label",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Heading — text scramble reveal
      const chars = gsap.utils.toArray<HTMLElement>(".about-heading-char");
      const targetText = chars.map((el) => el.dataset.char || " ");
      const randomSymbol = () =>
        SCRAMBLE_SYMBOLS[Math.floor(Math.random() * SCRAMBLE_SYMBOLS.length)];
      chars.forEach((el) => {
        el.textContent = randomSymbol();
      });
      gsap.to(
        { p: 0 },
        {
          p: 1,
          duration: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: function () {
            const progress = this.progress();
            chars.forEach((el, i) => {
              el.textContent =
                progress >= i / chars.length ? targetText[i] : randomSymbol();
            });
          },
          onComplete: () => {
            chars.forEach((el, i) => {
              el.textContent = targetText[i];
            });
          },
        }
      );

      // 3. Summary — staggered words fade-up
      gsap.fromTo(
        ".about-summary-word",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.01,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-summary",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 4. Quick facts — count up from 0
      gsap.utils.toArray<HTMLElement>(".about-fact-value").forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10);
        const suffix = el.dataset.suffix || "";
        el.textContent = `0${suffix}`;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          snap: { val: 1 },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
        });
      });

      // 5. Polaroid — parallax + tilt resetting as it enters the viewport
      if (polaroid) {
        gsap.set(polaroid, { rotation: -8, transformOrigin: "center center" });
        gsap.fromTo(
          polaroid,
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          polaroid,
          { rotation: -8 },
          {
            rotation: restingTilt,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 6. Decorative vertical line — draws from top to bottom
      gsap.fromTo(
        ".about-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about">
      {/* Decorative vertical line on the left edge */}
      <div className="about-line" aria-hidden="true" />

      <div className="about-container">
        <div className="about-grid">
          <div className="about-left">
            <p className="about-label">{LABEL}</p>

            <h2 className="about-heading" aria-label={HEADING}>
              {HEADING.split("").map((char, i) => (
                <span
                  key={i}
                  className="about-heading-char"
                  data-char={char === " " ? "\u00A0" : char}
                  aria-hidden="true"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>

            <p className="about-summary">
              {SUMMARY_WORDS.map((word, i) => (
                <span key={i} className="about-summary-word">
                  {word}
                  {i < SUMMARY_WORDS.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </p>

            <div className="about-facts">
              {FACTS.map((fact) => (
                <div key={fact.label} className="about-fact">
                  <span
                    className="about-fact-value"
                    data-target={fact.value}
                    data-suffix={fact.suffix}
                  >
                    {fact.value}
                    {fact.suffix}
                  </span>
                  <span className="about-fact-label">{fact.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-right">
            <div
              ref={polaroidRef}
              className="about-polaroid"
              onMouseEnter={handlePolaroidEnter}
              onMouseLeave={handlePolaroidLeave}
            >
              <div className="about-polaroid-image">
                <Camera
                  className="about-polaroid-icon"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <p className="about-polaroid-caption">Shavez at work ☕</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coffee stain — subtle, bottom-right */}
      <svg
        className="about-coffee-stain"
        viewBox="0 0 220 200"
        fill="#8a5a2b"
        aria-hidden="true"
      >
        <path
          d="M74 44 C 104 30, 150 34, 172 60 C 190 80, 196 116, 176 142 C 154 170, 106 182, 76 166 C 52 154, 34 128, 40 96 C 42 78, 58 52, 74 44 Z"
          opacity="0.55"
        />
        <path
          d="M96 62 C 116 52, 152 60, 160 84 C 168 106, 152 138, 124 142 C 92 148, 72 132, 68 108 C 64 86, 74 72, 96 62 Z"
          opacity="0.7"
        />
        <circle cx="38" cy="88" r="10" opacity="0.6" />
        <circle cx="176" cy="64" r="8" opacity="0.55" />
        <circle cx="182" cy="140" r="12" opacity="0.5" />
        <circle cx="60" cy="168" r="9" opacity="0.55" />
        <circle cx="126" cy="172" r="6" opacity="0.5" />
      </svg>
    </section>
  );
}