"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("education-reduced");
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".education-kicker",
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        0
      );
      tl.fromTo(
        ".education-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 0.9, ease: "power3.out" },
        0
      );
      tl.fromTo(
        ".education-content",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.05
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="education">
      <div className="education-shell">
        <h2 className="education-kicker">EDUCATION</h2>

        <div className="education-card">
          <span className="education-line" aria-hidden="true" />
          <div className="education-content">
            <div className="education-head">
              <span className="education-period">2022 &ndash; 2026</span>
            </div>
            <h3 className="education-institution">
              Dr. Akhilesh Das Gupta Institute of Professional Studies, GGSIPU
            </h3>
            <p className="education-degree">
              B.Tech in Computer Science Engineering (Completed) &mdash; CGPA:
              &nbsp;7.7/10
            </p>
            <p className="education-location">New Delhi</p>
          </div>
        </div>
      </div>
    </section>
  );
}