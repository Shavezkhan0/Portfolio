"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceRole {
  company: string;
  position: string;
  location: string;
  period: string;
  current?: boolean;
  radius: number;
  stain?: boolean;
  bullets: ReactNode[];
  stack: string[];
}

const EXPERIENCE: ExperienceRole[] = [
  {
    company: "Deli Cocktail House",
    position: "Software Engineer",
    location: "New Delhi",
    period: "Jan 2026 – Present",
    current: true,
    radius: 6,
    bullets: [
      <>Designed and developed a <strong>full-stack ERP</strong> for HR, payroll, attendance, inventory, and event management using Next.js 16, Node.js, Prisma, and PostgreSQL — deployed on AWS.</>,
      <>Built an <strong>Admin Web Panel</strong> with role-based access control for managing employees, attendance, payroll, inventory, events, and operational workflows.</>,
      <>Developed an <strong>Employee Web Panel</strong> for secure attendance, salary, and event access with OTP + JWT authentication.</>,
      <>Built a cross-platform <strong>Employee Mobile App</strong> using Flutter & Dart with full REST API synchronization for Android and iOS.</>,
      <>Implemented <strong>AI-powered WhatsApp chatbot</strong> using n8n workflow automation — handles client FAQs, menu queries, and escalations automatically.</>,
      <>Tested all REST APIs using <strong>Postman</strong>; handled deployment, debugging, and data validation throughout the development lifecycle.</>,
    ],
    stack: [
      "Flutter",
      "Dart",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "AWS",
      "n8n",
      "Turborepo",
    ],
  },
  {
    company: "OneSource – Pepti Wiki",
    position: "Full Stack Developer Intern",
    location: "Remote",
    period: "Nov 2025 – Jan 2026",
    radius: 8,
    stain: true,
    bullets: [
      <>Developed <strong>15+ responsive UI modules</strong> using Next.js 15 and React 19 within a distributed agile development team.</>,
      <>Integrated REST APIs using <strong>TanStack Query</strong> and implemented authentication workflows using Supabase Auth.</>,
      <>Assisted backend development using <strong>Hono</strong> in a Turborepo + pnpm-based monorepo with shared packages.</>,
      <>Participated in sprint planning, code reviews, debugging, and feature development following collaborative agile practices.</>,
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TanStack Query",
      "Supabase Auth",
      "Hono",
      "Turborepo",
      "pnpm",
      "REST APIs",
    ],
  },
  {
    company: "WESEE · Indian Navy",
    position: "Application Developer Intern",
    location: "New Delhi",
    period: "Jul 2025 – Oct 2025",
    radius: 7,
    bullets: [
      <>Developed interactive <strong>BI dashboards</strong> using React, Next.js, Tailwind CSS, Chart.js, Python/Flask, SQL databases, and CSV data processing.</>,
      <>Implemented interactive charts, filtering, dashboard configuration, data import, and <strong>Power BI-compatible</strong> reporting features.</>,
      <>Built resilient backend endpoints with <strong>Python & Flask</strong>, structured SQL indexes, and file mapping/import workflows for massive datasets.</>,
    ],
    stack: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Chart.js",
      "Python",
      "Flask",
      "SQL",
      "CSV Processing",
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (!isDesktop) {
      section.classList.add("experience-stacked");
      return;
    }

    if (prefersReducedMotion) {
      section.classList.add("experience-reduced");
      return;
    }

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".experience-header > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Horizontal scrub — moves the track and creates the pin distance
      const horizontalTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 80}`,
          invalidateOnRefresh: true,
        },
      });

      // Line draws itself across the full scroll distance
      gsap.to(".experience-line-path", {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 80}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Per-slide entrance as each card reaches the viewport center
      const slides = gsap.utils.toArray<HTMLElement>(".experience-slide");
      slides.forEach((slide) => {
        const card = slide.querySelector(".experience-card");
        const dot = slide.querySelector(".experience-dot");
        const tags = slide.querySelectorAll(".experience-tag");

        if (card) {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontalTween,
                start: "center 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontalTween,
                start: "center 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (tags.length) {
          gsap.fromTo(
            tags,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontalTween,
                start: "center 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Hover lift + press interactions (GSAP transforms, not CSS)
      gsap.utils.toArray<HTMLElement>(".experience-card").forEach((card) => {
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(
          card,
          { y: -5, duration: 0.3, ease: "power2.out" },
          0
        );
        hoverTl.to(
          card,
          {
            borderColor: "rgba(245, 158, 11, 0.6)",
            boxShadow: "0 24px 48px -20px rgba(245, 158, 11, 0.25)",
            duration: 0.3,
            ease: "power2.out",
          },
          0
        );

        const enter = () => hoverTl.play();
        const leave = () => hoverTl.reverse();
        const press = () =>
          gsap.to(card, { scale: 0.98, duration: 0.12, ease: "power2.out" });
        const release = () =>
          gsap.to(card, { scale: 1, duration: 0.15, ease: "power2.out" });

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        card.addEventListener("mousedown", press);
        card.addEventListener("mouseup", release);
        card.addEventListener("focus", enter);
        card.addEventListener("blur", leave);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience">
      <div className="experience-header">
        <span className="experience-label">EXPERIENCE</span>
        <h2 className="experience-heading">Where I&apos;ve Worked</h2>
      </div>

      <div className="experience-viewport">
        <div ref={trackRef} className="experience-track">
          {/* Slightly wobbling hand-drawn style timeline */}
          <svg
            className="experience-line"
            viewBox="0 0 1000 24"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="experienceLineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#a3b18a" />
              </linearGradient>
            </defs>
            <path
              className="experience-line-path"
              d="M0,12 C 60,5 150,19 260,12 C 370,5 480,19 600,12 C 720,5 850,19 1000,12"
              fill="none"
              stroke="url(#experienceLineGradient)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
            />
          </svg>

          {EXPERIENCE.map((role, i) => (
            <article key={i} className="experience-slide">
              <span className="experience-dot">
                <span className="experience-dot-glow" />
              </span>

              <div
                className="experience-card"
                style={{ borderRadius: role.radius }}
                tabIndex={0}
              >
                {role.stain && (
                  <svg
                    className="experience-stain"
                    viewBox="0 0 200 200"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="100" cy="100" r="58" stroke="#8a5a2b" strokeWidth="7" />
                    <circle cx="100" cy="100" r="72" stroke="#8a5a2b" strokeWidth="2" opacity="0.5" />
                    <circle cx="74" cy="74" r="6" stroke="#8a5a2b" strokeWidth="1.5" opacity="0.6" />
                    <circle cx="128" cy="122" r="5" stroke="#8a5a2b" strokeWidth="1.5" opacity="0.6" />
                  </svg>
                )}

                {role.current && (
                  <span className="experience-current">● CURRENT</span>
                )}

                <h3 className="experience-company">{role.company}</h3>
                <p className="experience-position">
                  {role.position} · {role.location}
                </p>
                <p className="experience-period">{role.period}</p>

                <ul className="experience-bullets">
                  {role.bullets.map((bullet, bi) => (
                    <li key={bi}>{bullet}</li>
                  ))}
                </ul>

                <div className="experience-tags">
                  {role.stack.map((tag) => (
                    <span key={tag} className="experience-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}