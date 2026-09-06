"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("achievements-reduced");
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".achievement-card",
        { rotateY: 90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      const counterEl = section.querySelector(".achievement-count");
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 500,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (counterEl) counterEl.textContent = Math.round(counter.val) + "+";
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="achievements">
      <div className="achievements-shell">
        <div className="achievements-header">
          <span className="achievements-kicker">ACHIEVEMENTS</span>
          <h2 className="achievements-heading">Proof of Work</h2>
        </div>

        <div className="achievements-grid">
          <article className="achievement-card" style={{ minHeight: 230 }}>
            <div className="achievement-ico">
              <Trophy className="achievement-icon" />
            </div>
            <p className="achievement-text">
              1+ years of professional software development experience across
              full-stack web development, cross-platform mobile application
              development, cloud deployment, API development, and workflow
              automation.
            </p>
          </article>

          <article className="achievement-card achievement-card--tall" style={{ minHeight: 252 }}>
            <div className="achievement-ico">
              <Code2 className="achievement-icon" />
            </div>
            <p className="achievement-text">
              Solved{" "}
              <span className="achievement-count" aria-label="500+">
                500+
              </span>{" "}
              problems on LeetCode and other competitive programming platforms,
              strengthening problem-solving and algorithmic skills.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}