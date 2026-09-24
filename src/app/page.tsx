"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Linkedin,
  Menu,
  Sun,
  X,
} from "lucide-react";
import { WorkShowcase } from "@/components/work-showcase";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Education } from "@/components/education";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Achievements } from "@/components/achievements";
import { Contact } from "@/components/contact";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const showcaseSlides = [
  {
    title: "ERP Module Selection",
    description: "Full-stack ERP system for Deli Cocktail House — HR, payroll, attendance, inventory and event management built with Next.js & PostgreSQL.",
    imageSrc: "/deli/admin/admin-1.png",
    tags: ["Next.js 16", "TypeScript", "PostgreSQL"],
    accent: "bg-blue-500",
  },
  {
    title: "Admin Attendance Dashboard",
    description: "Real-time attendance tracking and management module for all employees across Office and Warehouse/Site departments.",
    imageSrc: "/deli/admin/admin-3.png",
    tags: ["Prisma ORM", "Node.js", "RBAC"],
    accent: "bg-cyan-500",
  },
  {
    title: "Payroll Management Module",
    description: "Automated payroll computation engine with salary slip generation, deduction handling, and export-ready PDF reports.",
    imageSrc: "/deli/admin/admin-7.png",
    tags: ["Express.js", "Supabase", "REST API"],
    accent: "bg-purple-500",
  },
  {
    title: "Inventory & Events Control",
    description: "Complete inventory tracking and event dispatch management for warehouse operations, with low-stock alerts and assignment workflows.",
    imageSrc: "/deli/admin/admin-10.png",
    tags: ["Redis", "JWT", "AWS"],
    accent: "bg-emerald-500",
  },
  {
    title: "Employee Web Portal — Dashboard",
    description: "Employee-facing portal for attendance check-in, salary details, assigned events and personal profile management.",
    imageSrc: "/deli/employee/employee-1.png",
    tags: ["React 19", "TanStack Query", "Tailwind"],
    accent: "bg-indigo-500",
  },
  {
    title: "Employee Profile & Salary View",
    description: "Employees can view their payroll breakdown, leave balance, extra duty days and monthly salary status through secure authenticated workflows.",
    imageSrc: "/deli/employee/employee-4.png",
    tags: ["Supabase Auth", "OTP", "Role-Based"],
    accent: "bg-pink-500",
  },
  {
    title: "Flutter Employee Mobile App",
    description: "Cross-platform mobile application mirroring the web portal — built with Flutter & Dart for Android and iOS with full API synchronization.",
    imageSrc: "/deli/mobile/mobile-1.jpeg",
    tags: ["Flutter", "Dart", "REST APIs"],
    accent: "bg-teal-500",
  },
  
  {
    title: "Mobile Attendance & Salary",
    description: "Employees can mark attendance, view salary slips, check assigned events and update profile information directly from their mobile device.",
    imageSrc: "/deli/mobile/mobile-6.jpeg",
    tags: ["Android", "iOS", "Dart"],
    accent: "bg-orange-500",
  },
  {
    title: "AI WhatsApp Chatbot (n8n)",
    description: "AI-powered WhatsApp automation workflow built with n8n — handles client FAQs, menu queries, drinks info, escalations and Google Sheets logging.",
    imageSrc: "/deli/n8n/chatbot-1.png",
    tags: ["n8n", "OpenAI", "WhatsApp API"],
    accent: "bg-green-500",
  },
  {
    title: "Chatbot n8n Workflow Detail",
    description: "Multi-branch intelligent routing — ChatModel, Simple Memory, FAQ/Drinks/Menu/Escalation tools wired to WhatsApp trigger and send nodes.",
    imageSrc: "/deli/n8n/chatbot-2.png",
    tags: ["AI Agent", "LangChain", "Automation"],
    accent: "bg-yellow-500",
  },
];

// ─── Page Component ───────────────────────────────────────────────────────────

// New Delhi stays on IST (GMT+5:30) year-round, so a fixed zone is safe.
const DELHI_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeClicks, setThemeClicks] = useState(0);
  const [delhiTime, setDelhiTime] = useState("");
  const headerRef = useRef<HTMLElement>(null);

  // ── Scroll Spy (ScrollTrigger) ─────────────────────────────────────────────
  useEffect(() => {
    const sections = ["home", "about", "education", "skills", "experience", "work", "projects", "achievements", "contact"];
    const triggers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 10%",
        onToggle: (self) => {
          if (self.isActive) setActiveSection(id);
        },
      });
    });
    return () => triggers.forEach((t) => t && t.kill());
  }, []);

  // ── Nav reveal after the hero ─────────────────────────────────────────────
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const onScroll = () => {
      const show = window.scrollY > window.innerHeight * 0.85;
      header.classList.toggle("is-visible", show);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Anti-AI easter egg ─────────────────────────────────────────────────────
  useEffect(() => {
    console.log("Hey there, curious developer! 👋 - Shavez");
  }, []);

  // ── Live New Delhi clock (tics on the minute) ────────────────────────────
  useEffect(() => {
    const update = () => setDelhiTime(DELHI_FORMATTER.format(new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  // ── Magnetic pill nav (fine pointers only; never under reduced motion) ───
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const links = Array.from(
      document.querySelectorAll<HTMLElement>(".site-nav-link")
    );
    const cleanups: Array<() => void> = [];

    links.forEach((link) => {
      const xTo = gsap.quickTo(link, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(link, "y", { duration: 0.35, ease: "power3" });
      const onMove = (e: MouseEvent) => {
        const r = link.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.22);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      link.addEventListener("mousemove", onMove);
      link.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        link.removeEventListener("mousemove", onMove);
        link.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  // ─── JSX ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative min-h-screen bg-background text-foreground micro-dots antialiased selection:bg-accent-purple/35 selection:text-white"
      suppressHydrationWarning
    >
      {/* Skip link */}
      <a href="#home" className="skip-link">
        Skip to content
      </a>

      {/* ── HEADER ── */}
      <header ref={headerRef} className="site-nav" aria-label="Primary">
        <div className="site-nav-inner">
          <a href="#home" onClick={() => setMenuOpen(false)} className="site-nav-brand">
            <span className="site-nav-logo">SK</span>
            <span className="site-nav-brandtext">
              <span className="site-nav-name">Shavez Khan</span>
              <span className="site-nav-role">Software Engineer</span>
            </span>
          </a>

          <span className="nav-status" role="status">
            <span className="nav-status-dot" aria-hidden="true" />
            Available for Contract &amp; Full-time
          </span>

          <nav className="site-nav-links" aria-label="Sections">
            {[
              { id: "about", label: "About" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`site-nav-link ${
                  activeSection === item.id ? "is-active" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-nav-actions">
            <span className="nav-clock" aria-label="Current time in New Delhi">
              {delhiTime}
              <span className="nav-clock-zone">IST</span>
            </span>

            <button
              type="button"
              key={themeClicks}
              onClick={() => setThemeClicks((c) => c + 1)}
              className="theme-toggle"
              aria-label="Toggle theme (it just spins)"
            >
              <Sun className="w-4 h-4" />
            </button>

            <a
              href="https://github.com/Shavezkhan0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="site-nav-icon"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shavez-khan-1b8910163/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="site-nav-icon hidden md:flex"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              type="button"
              className="site-nav-burger"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          className={`site-nav-mobile ${menuOpen ? "is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          {[
            { id: "about", label: "About" },
            { id: "experience", label: "Experience" },
            { id: "projects", label: "Projects" },
            { id: "skills", label: "Skills" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="site-nav-mobile-link"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <Hero />

      <About />

      <Education />

      <Skills />

      {/* ── EXPERIENCE (Full-width pinned horizontal timeline) ── */}
      <Experience />

      {/* ── CURRENT WORK SHOWCASE (Full-width pinned section) ── */}
      <section id="work" className="scroll-mt-0">
        <WorkShowcase slides={showcaseSlides} />
      </section>

      {/* ── PROJECTS (Full-width masonry showcase) ── */}
      <Projects />

      {/* ── ACHIEVEMENTS (Flip-in badge cards) ── */}
      <Achievements />

      {/* ── CONTACT + FOOTER (Two-column layout, floating-label form) ── */}
      <Contact />
    </div>
  );
}