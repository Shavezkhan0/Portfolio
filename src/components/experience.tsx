"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

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

const slideVariants = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Experience() {
  const shouldReduce = useReducedMotion();

  // When the user prefers reduced motion, keep everything fully visible.
  const reveal = shouldReduce
    ? {}
    : {
        variants: slideVariants,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section id="experience" className="experience">
      <div className="experience-header">
        <span className="experience-label">EXPERIENCE</span>
        <motion.h2
          className="experience-heading"
          {...reveal}
          transition={{ delay: 0.05 }}
        >
          Where I&apos;ve Worked
        </motion.h2>
      </div>

      <div className="experience-track">
        {EXPERIENCE.map((role, i) => (
          <motion.article key={i} className="experience-slide" {...reveal}>
            <div className="experience-rail" aria-hidden="true">
              <span className="experience-dot">
                <span className="experience-dot-glow" />
              </span>
              <span className="experience-rail-line" />
            </div>

            <div
              className="experience-card"
              style={{ borderRadius: role.radius }}
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
          </motion.article>
        ))}
      </div>
    </section>
  );
}