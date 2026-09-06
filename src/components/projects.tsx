"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Eye } from "lucide-react";
import { LazyImage } from "@/components/lazy-image";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle?: string;
  year: string;
  ratio: string;
  border: "full" | "bottom" | "left";
  tint: string;
  sticker?: string;
  imageSrc?: string;
  bullets: string[];
  stack: string[];
  github: string;
  live?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Food Delivery Platform",
    subtitle: "Web & Cross-Platform Mobile",
    year: "2024 – 2025",
    ratio: "16 / 9",
    border: "full",
    tint: "linear-gradient(135deg, rgba(251, 146, 60, 0.3), rgba(244, 63, 94, 0.1))",
    bullets: [
      "Developed a complete food delivery ecosystem with customer, restaurant, and admin applications.",
      "Cross-platform mobile using Flutter and Dart for Android and iOS.",
      "REST APIs with Node.js, Express.js, and MongoDB Atlas.",
      "State management with Redux Toolkit, responsive web with Next.js and Tailwind CSS.",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
    github: "https://github.com/Shavezkhan0/Food_Ordering_Platform",
    live: "https://food-ordering-platform-flame.vercel.app/",
  },
  {
    title: "ERP Solution",
    subtitle: "Deli Cocktail House",
    year: "2026",
    ratio: "3 / 2",
    border: "bottom",
    sticker: "New!",
    tint: "linear-gradient(135deg, rgba(6, 182, 212, 0.28), rgba(99, 102, 241, 0.12))",
    bullets: [
      "Full-stack ERP for HR, payroll, attendance, inventory, and event management.",
      "Admin Web Panel, Employee Web Panel, and Flutter Mobile App.",
      "REST APIs with Node.js, Express.js, TypeScript, Prisma, PostgreSQL.",
      "Authentication with email OTP, JWT, Redis, and RBAC.",
      "AI WhatsApp chatbot using n8n.",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "Redis",
      "AWS",
      "n8n",
    ],
    github: "https://github.com/Shavezkhan0",
  },
  {
    title: "Analytics Dashboard Platform",
    year: "2025",
    ratio: "4 / 3",
    border: "left",
    tint: "linear-gradient(135deg, rgba(168, 85, 247, 0.26), rgba(236, 72, 153, 0.1))",
    bullets: [
      "Scalable analytics platform with interactive visualization and dashboard generation.",
      "Role-based access, data processing, and BI reporting workflows.",
    ],
    stack: ["Next.js", "React.js", "PostgreSQL", "SQL Server", "Docker", "Python"],
    github: "https://github.com/Shavezkhan0/dashboard-monorepo",
  },
  {
    title: "Academic Decision Support System",
    year: "2025",
    ratio: "16 / 9",
    border: "full",
    tint: "linear-gradient(135deg, rgba(16, 185, 129, 0.26), rgba(14, 165, 233, 0.1))",
    bullets: [
      "AI-powered academic platform with semantic search, recommendation, and career guidance.",
    ],
    stack: ["React.js", "FastAPI", "PostgreSQL", "LangChain", "Python"],
    github: "https://github.com/Shavezkhan0/AI_assignment_RAG_Twitter",
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      section.classList.add("projects-reduced");
      return;
    }

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".projects-header > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger in as the section scrolls into view
      ScrollTrigger.batch(".project-card-inner", {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out" }
          ),
        start: "top 85%",
        once: true,
      });

      // Per-card curtain reveal + year badge + tag pop
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        const inner = card.querySelector(".project-media-inner");
        const overlay = card.querySelector(".project-media-overlay");
        const badge = card.querySelector(".project-year");
        const tags = card.querySelectorAll(".experience-tag");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        if (inner && overlay) {
          // Curtain slides up first, then the image clip-path reveals
          tl.fromTo(
            overlay,
            { yPercent: 0 },
            { yPercent: -100, duration: 0.7, ease: "power3.inOut" },
            0
          );
          tl.fromTo(
            inner,
            { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.2,
              ease: "power3.inOut",
            },
            "-=0.2"
          );
        }

        if (badge) {
          tl.fromTo(
            badge,
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=1.0"
          );
        }

        if (tags.length) {
          tl.fromTo(
            tags,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              stagger: 0.03,
              ease: "back.out(1.7)",
            },
            "-=0.8"
          );
        }
      });

      // Custom "VIEW" cursor — follows the pointer with a soft lag
      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        x: -100,
        y: -100,
        opacity: 0,
        scale: 0.8,
      });
      const cursorX = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
      const cursorY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
      section.addEventListener("mousemove", (ev) => {
        cursorX(ev.clientX);
        cursorY(ev.clientY);
      });
      section.addEventListener("mouseleave", () => {
        gsap.to(cursor, { opacity: 0, scale: 0.8, duration: 0.2 });
      });

      // Hover interactions — image zoom, subtle card rotation, cursor toggle
      gsap.utils.toArray<HTMLElement>(".project-media").forEach((media) => {
        const inner = media.querySelector(".project-media-inner");
        const cardInner = media.closest(".project-card-inner");

        media.addEventListener("mouseenter", () => {
          if (inner) {
            gsap.to(inner, { scale: 1.05, duration: 0.8, ease: "power3.out" });
          }
          if (cardInner) {
            gsap.to(cardInner, { rotation: 0.5, duration: 0.4, ease: "power2.out" });
          }
          gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.25 });
        });
        media.addEventListener("mouseleave", () => {
          if (inner) {
            gsap.to(inner, { scale: 1, duration: 0.8, ease: "power3.out" });
          }
          if (cardInner) {
            gsap.to(cardInner, { rotation: 0, duration: 0.4, ease: "power2.out" });
          }
          gsap.to(cursor, { opacity: 0, scale: 0.8, duration: 0.25 });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects">
      <div className="projects-header">
        <span className="projects-label">PROJECTS</span>
        <h2 className="projects-heading">Things I&apos;ve Built</h2>
        <p className="projects-subtitle">Some projects I&apos;m proud of</p>
      </div>

      <div className="projects-masonry">
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            className="project-card"
            data-border={project.border}
            data-index={i + 1}
          >
            <article className="project-card-inner">
              <div
                className="project-media"
                data-aspect-ratio={project.ratio}
                style={{ aspectRatio: project.ratio }}
              >
                <div
                  className="project-media-inner"
                  style={{ background: project.tint }}
                >
                  {project.imageSrc ? (
                    <LazyImage
                      src={project.imageSrc}
                      alt={project.title}
                      className="object-cover w-full h-full"
                      sizes="(max-width: 767px) 100vw, 50vw"
                    />
                  ) : (
                    <span className="project-media-label">
                      {project.title}
                    </span>
                  )}
                </div>

                {/* Curtain reveal pane */}
                <div className="project-media-overlay" aria-hidden="true" />

                {/* Hover overlay */}
                <div className="project-hover">
                  <Eye className="w-4 h-4" />
                  <span className="project-hover-text">VIEW</span>
                </div>

                <span className="project-year">{project.year}</span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              {project.subtitle && (
                <p className="project-subtitle">{project.subtitle}</p>
              )}

              <ul className="project-bullets">
                {project.bullets.map((bullet, bi) => (
                  <li key={bi}>{bullet}</li>
                ))}
              </ul>

              <div className="project-tags">
                {project.stack.map((tag) => (
                  <span key={tag} className="experience-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a
                  className="project-link"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="project-link-arrow w-3.5 h-3.5" />
                </a>
                {project.live && (
                  <a
                    className="project-link"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="project-link-arrow w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {project.sticker && (
                <span className="project-sticker">{project.sticker}</span>
              )}
            </article>
          </div>
        ))}
      </div>

      {/* Custom VIEW cursor */}
      <div ref={cursorRef} className="project-cursor">
        <Eye className="w-3 h-3" />
        VIEW
      </div>
    </section>
  );
}