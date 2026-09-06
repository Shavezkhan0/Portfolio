"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { debounce } from "@/lib/debounce";

gsap.registerPlugin(ScrollTrigger);

type Level = "Expert" | "Advanced" | "Intermediate" | "Learning";

interface Skill {
  name: string;
  level: Level;
  size: 1 | 2 | 3;
  learning?: boolean;
}

interface SkillGroup {
  label: string;
  skills: Skill[];
}

const LEVEL_PERCENT: Record<Level, number> = {
  Expert: 95,
  Advanced: 85,
  Intermediate: 72,
  Learning: 45,
};

const SIZE_STYLES: Record<1 | 2 | 3, { fontSize: string; padding: string }> = {
  1: { fontSize: "0.72rem", padding: "6px 12px" },
  2: { fontSize: "0.85rem", padding: "8px 15px" },
  3: { fontSize: "1rem", padding: "9px 18px" },
};

const ROTATIONS = [2, -1, 3, 0, -3, 1, -2];

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      { name: "JavaScript", level: "Advanced", size: 2 },
      { name: "TypeScript", level: "Expert", size: 3 },
      { name: "Python", level: "Intermediate", size: 2 },
      { name: "Java", level: "Intermediate", size: 2 },
      { name: "C++", level: "Intermediate", size: 1 },
      { name: "SQL", level: "Intermediate", size: 1 },
      { name: "Dart", level: "Advanced", size: 2 },
    ],
  },
  {
    label: "Mobile Development",
    skills: [
      { name: "Flutter", level: "Expert", size: 3 },
      { name: "Android", level: "Advanced", size: 2 },
      { name: "iOS", level: "Intermediate", size: 1 },
      { name: "Cross-Platform Mobile Development", level: "Advanced", size: 2 },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React.js", level: "Expert", size: 3 },
      { name: "Next.js", level: "Expert", size: 3 },
      { name: "Tailwind CSS", level: "Expert", size: 2 },
      { name: "HTML5", level: "Advanced", size: 2 },
      { name: "CSS3", level: "Advanced", size: 2 },
      { name: "shadcn/ui", level: "Advanced", size: 1 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", level: "Expert", size: 3 },
      { name: "Express.js", level: "Expert", size: 2 },
      { name: "Hono", level: "Advanced", size: 2 },
      { name: "FastAPI", level: "Intermediate", size: 2 },
      { name: "Flask", level: "Intermediate", size: 1 },
      { name: "REST APIs", level: "Expert", size: 2 },
    ],
  },
  {
    label: "Databases & State Management",
    skills: [
      { name: "PostgreSQL", level: "Advanced", size: 2 },
      { name: "MongoDB Atlas", level: "Advanced", size: 2 },
      { name: "Prisma ORM", level: "Advanced", size: 2 },
      { name: "Supabase", level: "Advanced", size: 2 },
      { name: "Redis", level: "Intermediate", size: 1 },
      { name: "Redux Toolkit", level: "Intermediate", size: 1 },
      { name: "TanStack Query", level: "Intermediate", size: 1 },
    ],
  },
  {
    label: "Authentication",
    skills: [
      { name: "JWT", level: "Expert", size: 2 },
      { name: "Role-Based Access Control", level: "Expert", size: 2 },
      { name: "Supabase Auth", level: "Advanced", size: 2 },
      { name: "Email OTP", level: "Advanced", size: 1 },
    ],
  },
  {
    label: "Cloud, Automation & Tools",
    skills: [
      { name: "AWS", level: "Advanced", size: 2 },
      { name: "Docker", level: "Intermediate", size: 1 },
      { name: "Vercel", level: "Advanced", size: 1 },
      { name: "n8n", level: "Advanced", size: 1 },
      { name: "Postman", level: "Advanced", size: 1 },
      { name: "Git", level: "Expert", size: 2 },
      { name: "GitHub", level: "Advanced", size: 2 },
      { name: "Turborepo", level: "Intermediate", size: 1 },
      { name: "pnpm", level: "Intermediate", size: 1 },
      { name: "CI/CD", level: "Intermediate", size: 1 },
      { name: "Agile", level: "Intermediate", size: 1 },
      { name: "Scrum", level: "Intermediate", size: 1 },
      { name: "learning...", level: "Learning", size: 1, learning: true },
    ],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLSpanElement>(null);

  const [view, setView] = useState<"cloud" | "list">("cloud");

  const physicsRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onView = debounce(() => requestAnimationFrame(() => ScrollTrigger.refresh()), 150);
    window.addEventListener("resize", onView);
    return () => window.removeEventListener("resize", onView);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [view]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cloud = cloudRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("skills-reduced");
      return;
    }

    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header > *",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      const entries: gsap.core.Timeline[] = [];
      const wraps = gsap.utils.toArray<HTMLElement>(".skills-tag-wrap");
      const pills = gsap.utils.toArray<HTMLElement>(".skills-tag");

      wraps.forEach((wrap, i) => {
        const pill = wrap.querySelector<HTMLElement>(".skills-tag");
        const rotation = ROTATIONS[i % ROTATIONS.length];
        const tl = gsap.timeline({ delay: i * 0.02, paused: true });

        tl.fromTo(
          wrap,
          { x: gsap.utils.random(-46, 46), y: gsap.utils.random(-46, 46), opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
          0
        );
        if (pill) {
          tl.fromTo(
            pill,
            { scale: 0.5, rotation: gsap.utils.random(-5, 5) },
            { scale: 1, rotation, duration: 1.5, ease: "power3.out" },
            0
          );
        }

        const floatDur = gsap.utils.random(3, 6);
        const phase = gsap.utils.random(0, 2);
        tl.to(wrap, { y: "+=10", yoyo: true, repeat: -1, duration: floatDur, ease: "sine.inOut", delay: phase }, ">-0.3");
        tl.to(wrap, { x: "+=7", yoyo: true, repeat: -1, duration: floatDur * 1.25, ease: "sine.inOut", delay: phase + 0.5 }, "<");

        entries.push(tl);
      });

      ScrollTrigger.create({
        trigger: cloud,
        start: "top 85%",
        once: true,
        onEnter: () => entries.forEach((tl) => tl.play()),
      });

      const fills = gsap.utils.toArray<HTMLElement>(".skills-bar-fill");
      fills.forEach((fill) => {
        const target = fill.dataset.pct || "80";
        gsap.fromTo(
          fill,
          { width: "0%" },
          {
            width: target + "%",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: fill, start: "top 94%", toggleActions: "play none none none" },
          }
        );
      });

      pills.forEach((pill, i) => {
        const wrap = pill.parentElement;
        const tooltip = wrap?.querySelector<HTMLElement>(".skills-tooltip");
        const permanentRotation = ROTATIONS[i % ROTATIONS.length];

        pill.addEventListener("click", () => {
          gsap.fromTo(pill, { scale: 1 }, { scale: 1.2, duration: 0.12, repeat: 1, yoyo: true, ease: "power2.out" });
          if (tooltip) {
            tooltip.classList.add("is-open");
            const id = window.setTimeout(() => tooltip.classList.remove("is-open"), 900);
            cleanupFns.push(() => window.clearTimeout(id));
          }
        });

        pill.addEventListener("mouseenter", () => {
          gsap.to(pill, { scale: 1.15, rotation: 0, duration: 0.3, ease: "power2.out" });
        });

        pill.addEventListener("mouseleave", () => {
          gsap.to(pill, { scale: 1, rotation: permanentRotation, duration: 0.4, ease: "power2.out" });
        });
      });

      physicsRef.current = pills.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));
      let bases: { cx: number; cy: number }[] = [];

      const syncBases = () => {
        const rect = cloud!.getBoundingClientRect();
        bases = pills.map((el) => {
          const r = el.getBoundingClientRect();
          return { cx: r.left - rect.left + r.width / 2, cy: r.top - rect.top + r.height / 2 };
        });
      };

      const loop = () => {
        rafRef.current = requestAnimationFrame(loop);
        const ptr = pointerRef.current;
        if (!ptr.active) return;
        physicsRef.current.forEach((p, i) => {
          const base = bases[i];
          if (!base) return;
          const dx = base.cx + p.x - ptr.x;
          const dy = base.cy + p.y - ptr.y;
          const d2 = dx * dx + dy * dy;
          const radius = 110;
          if (d2 < radius * radius && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const force = ((radius - d) / radius) * 0.9;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
          p.vx += -p.x * 0.04;
          p.vy += -p.y * 0.04;
          p.vx *= 0.88;
          p.vy *= 0.88;
          p.x += p.vx;
          p.y += p.vy;
          const m = Math.hypot(p.x, p.y);
          if (m > 26) {
            p.x = (p.x / m) * 26;
            p.y = (p.y / m) * 26;
            p.vx *= 0.5;
            p.vy *= 0.5;
          }
          gsap.set(pills[i], { x: p.x, y: p.y });
        });
      };

      const onMove = (e: PointerEvent) => {
        const rect = cloud!.getBoundingClientRect();
        pointerRef.current.x = e.clientX - rect.left;
        pointerRef.current.y = e.clientY - rect.top;
        if (!pointerRef.current.active) {
          pointerRef.current.active = true;
          syncBases();
          loop();
        }
      };

      const onLeave = () => {
        pointerRef.current.active = false;
      };

      cloud?.addEventListener("pointermove", onMove);
      cloud?.addEventListener("pointerleave", onLeave);

      cleanupFns.push(() => {
        cloud?.removeEventListener("pointermove", onMove);
        cloud?.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => {
      ctx.revert();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  const switchTo = (next: "cloud" | "list") => {
    if (next !== view) setView(next);
    const knob = knobRef.current;
    if (knob) {
      knob.classList.remove("skills-knob-wobble");
      void knob.offsetWidth;
      knob.classList.add("skills-knob-wobble");
    }
  };

  return (
    <section id="skills" ref={sectionRef} className={`skills ${view === "list" ? "is-list" : ""}`}>
      <div className="skills-top">
        <div className="skills-header">
          <span className="skills-label">SKILLS</span>
          <h2 className="skills-heading">My Toolkit</h2>
          <p className="skills-hint">click a tag for proficiency &middot; move your pointer through the cloud</p>
        </div>

        <div className={`skills-toggle ${view === "list" ? "is-list" : ""}`} role="tablist" aria-label="Skills view">
          <span ref={knobRef} className="skills-toggle-knob" aria-hidden="true" />
          <button
            type="button"
            role="tab"
            aria-selected={view === "cloud"}
            className={`skills-toggle-btn ${view === "cloud" ? "active" : ""}`}
            onClick={() => switchTo("cloud")}
          >
            Cloud View
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "list"}
            className={`skills-toggle-btn ${view === "list" ? "active" : ""}`}
            onClick={() => switchTo("list")}
          >
            List View
          </button>
        </div>
      </div>

      <div className="skills-cloud" ref={cloudRef}>
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className="skills-cluster">
            <span className="skills-cluster-label">{group.label}</span>
            <div className="skills-cluster-tags">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`skills-tag-wrap ${skill.learning ? "is-learning" : ""}`}
                  style={{ zIndex: skill.size }}
                >
                  <button
                    type="button"
                    className={`skills-tag ${skill.learning ? "skills-tag--learning" : ""}`}
                    style={SIZE_STYLES[skill.size]}
                    aria-label={`${skill.name} - ${skill.level}`}
                  >
                    {skill.name}
                  </button>
                  <span className="skills-tooltip">{skill.level}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skills-list">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className="skills-list-group">
            <span className="skills-cluster-label">{group.label}</span>
            <div className="skills-list-rows">
              {group.skills.map((skill) => (
                <div key={skill.name} className="skills-bar-row">
                  <span className="skills-bar-name" style={{ fontStyle: skill.learning ? "italic" : undefined }}>
                    {skill.name}
                  </span>
                  <span className="skills-bar-track">
                    <span
                      className="skills-bar-fill"
                      data-pct={LEVEL_PERCENT[skill.level]}
                      style={{ "--pct": `${LEVEL_PERCENT[skill.level]}%` } as React.CSSProperties}
                    />
                  </span>
                  <span className="skills-bar-level">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}