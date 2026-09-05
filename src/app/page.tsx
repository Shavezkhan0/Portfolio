"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  Briefcase,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  Terminal,
  User,
  Wrench,
  Zap,
  Award,
} from "lucide-react";
import { TypingText } from "@/components/typing-text";
import { ProjectCard } from "@/components/project-card";
import { WorkShowcase } from "@/components/work-showcase";

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

const skillCategories = [
  { id: "all", name: "All Skills", icon: Layers },
  { id: "frontend", name: "Frontend", icon: Globe },
  { id: "backend", name: "Backend & Auth", icon: Code2 },
  { id: "mobile", name: "Mobile", icon: Cpu },
  { id: "databases", name: "Databases", icon: Database },
  { id: "tools", name: "Tools & Cloud", icon: Wrench },
];

const allSkills = [
  // Frontend
  { name: "React.js", category: "frontend", level: "90%", color: "text-cyan-400 border-cyan-500/30" },
  { name: "Next.js 16", category: "frontend", level: "95%", color: "text-white border-white/35" },
  { name: "TailwindCSS", category: "frontend", level: "90%", color: "text-sky-400 border-sky-500/35" },
  { name: "TypeScript", category: "frontend", level: "85%", color: "text-blue-400 border-blue-500/30" },
  { name: "JavaScript", category: "frontend", level: "90%", color: "text-yellow-400 border-yellow-500/30" },
  { name: "HTML / CSS", category: "frontend", level: "85%", color: "text-orange-400 border-orange-500/30" },
  { name: "TanStack Query", category: "frontend", level: "85%", color: "text-red-400 border-red-500/30" },
  { name: "shadcn/ui", category: "frontend", level: "80%", color: "text-slate-300 border-slate-500/30" },

  // Backend
  { name: "Node.js", category: "backend", level: "85%", color: "text-green-400 border-green-500/30" },
  { name: "Express.js", category: "backend", level: "85%", color: "text-yellow-400 border-yellow-500/30" },
  { name: "FastAPI", category: "backend", level: "75%", color: "text-teal-400 border-teal-500/30" },
  { name: "Hono", category: "backend", level: "75%", color: "text-orange-400 border-orange-500/30" },
  { name: "REST APIs", category: "backend", level: "92%", color: "text-indigo-400 border-indigo-500/30" },
  { name: "JWT & OTP Auth", category: "backend", level: "85%", color: "text-emerald-400 border-emerald-500/30" },
  { name: "Supabase Auth", category: "backend", level: "80%", color: "text-emerald-300 border-emerald-500/30" },
  { name: "RBAC", category: "backend", level: "85%", color: "text-violet-400 border-violet-500/30" },

  // Mobile
  { name: "Flutter", category: "mobile", level: "80%", color: "text-cyan-400 border-cyan-500/30" },
  { name: "Dart", category: "mobile", level: "80%", color: "text-blue-300 border-blue-500/30" },
  { name: "Android", category: "mobile", level: "75%", color: "text-green-400 border-green-500/30" },
  { name: "iOS", category: "mobile", level: "70%", color: "text-slate-300 border-slate-500/30" },

  // Databases
  { name: "PostgreSQL", category: "databases", level: "85%", color: "text-sky-300 border-sky-500/30" },
  { name: "Prisma ORM", category: "databases", level: "85%", color: "text-indigo-300 border-indigo-500/30" },
  { name: "MongoDB Atlas", category: "databases", level: "80%", color: "text-green-500 border-green-500/30" },
  { name: "Supabase", category: "databases", level: "85%", color: "text-emerald-500 border-emerald-500/30" },
  { name: "Redis", category: "databases", level: "75%", color: "text-red-400 border-red-500/30" },
  { name: "SQL Server", category: "databases", level: "80%", color: "text-orange-300 border-orange-500/30" },
  { name: "Redux Toolkit", category: "databases", level: "80%", color: "text-purple-400 border-purple-500/30" },

  // Tools
  { name: "Python", category: "tools", level: "80%", color: "text-yellow-300 border-yellow-500/35" },
  { name: "AWS", category: "tools", level: "75%", color: "text-orange-400 border-orange-500/30" },
  { name: "Docker", category: "tools", level: "75%", color: "text-sky-500 border-sky-500/30" },
  { name: "n8n Automation", category: "tools", level: "80%", color: "text-pink-400 border-pink-500/30" },
  { name: "Turborepo", category: "tools", level: "80%", color: "text-pink-500 border-pink-500/30" },
  { name: "Git & GitHub", category: "tools", level: "90%", color: "text-white border-white/30" },
  { name: "Postman", category: "tools", level: "85%", color: "text-orange-500 border-orange-500/30" },
  { name: "Vercel", category: "tools", level: "85%", color: "text-slate-200 border-slate-500/30" },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeSkillTab, setActiveSkillTab] = useState("all");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [formIsSending, setFormIsSending] = useState(false);
  const [formFeedback, setFormFeedback] = useState("");

  // Counter refs
  const counter1Ref = useRef<HTMLSpanElement>(null);
  const counter2Ref = useRef<HTMLSpanElement>(null);
  const counter3Ref = useRef<HTMLSpanElement>(null);

  const filteredSkills = activeSkillTab === "all"
    ? allSkills
    : allSkills.filter((s) => s.category === activeSkillTab);

  // ── Scroll Spy ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const sections = ["home", "about", "skills", "experience", "work", "projects", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: "-80px 0px -20px 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });
    return () => observers.forEach((o) => o && o.observer.unobserve(o.el));
  }, []);

  // ── GSAP Animations ────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hero entrance
      gsap.fromTo("#hero-badge", { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".hero-word", { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.5 });
      gsap.fromTo("#hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.9 });
      gsap.fromTo("#hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 1.1 });
      gsap.fromTo(".hero-btn", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)", delay: 1.3 });

      // Floating orbs
      gsap.to(".orb-purple", { y: -30, x: 15, scale: 1.05, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".orb-cyan", { y: 25, x: -20, scale: 1.08, duration: 12, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".orb-blue", { y: -20, x: 10, scale: 1.04, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });

      // About section
      gsap.fromTo("#about-heading", { clipPath: "inset(0 100% 0 0)", opacity: 0 }, {
        clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: "#about", start: "top 85%", toggleActions: "play none none reverse" }
      });
      gsap.fromTo("#about-spec-card", { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: "#about", start: "top 80%", toggleActions: "play none none reverse" }
      });
      gsap.fromTo("#about-bio-card", { x: 60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: "#about", start: "top 80%", toggleActions: "play none none reverse" }
      });

      // Counter animations
      const animateCounter = (el: HTMLElement | null, target: number, suffix: string, prefix = "") => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2.2, ease: "power2.out", snap: { val: 1 },
          onUpdate: () => { el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`; },
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reset" }
        });
      };
      animateCounter(counter1Ref.current, 3, "+");
      animateCounter(counter2Ref.current, 500, "+");
      animateCounter(counter3Ref.current, 10, "+");

      // Skills section
      gsap.fromTo("#skills-heading", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: "#skills", start: "top 85%", toggleActions: "play none none reverse" }
      });

      // Experience section
      gsap.fromTo("#exp-heading", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: "#experience", start: "top 85%", toggleActions: "play none none reverse" }
      });
      gsap.fromTo("#timeline-line", { scaleY: 0, transformOrigin: "top center" }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: "#timeline-container", start: "top 75%", end: "bottom 25%", scrub: 1 }
      });
      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card, i) => {
        gsap.fromTo(card, { x: 80, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.9, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" }
        });
      });

      // Projects section
      gsap.fromTo("#projects-heading", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: "#projects", start: "top 85%", toggleActions: "play none none reverse" }
      });
      ScrollTrigger.batch(".project-card-anim", {
        onEnter: (batch) => gsap.fromTo(batch,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" }
        ),
        start: "top 88%",
      });

      // Contact section
      gsap.fromTo("#contact-heading", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: "#contact", start: "top 85%", toggleActions: "play none none reverse" }
      });
      gsap.utils.toArray<HTMLElement>(".contact-item").forEach((item, i) => {
        gsap.fromTo(item, { x: -40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none reverse" }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Skill grid re-animate on tab change
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".skill-card", {
        onEnter: (batch) => gsap.fromTo(batch,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.06, ease: "power3.out" }
        ),
        start: "top 90%",
      });
    });
    return () => ctx.revert();
  }, [filteredSkills]);

  // ── Form ──────────────────────────────────────────────────────────────────
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = { name: "", email: "", message: "" };
    let hasError = false;
    if (!formValues.name.trim()) { errors.name = "Name is required"; hasError = true; }
    if (!formValues.email.trim()) { errors.email = "Email is required"; hasError = true; }
    else if (!/\S+@\S+\.\S+/.test(formValues.email)) { errors.email = "Invalid email format"; hasError = true; }
    if (!formValues.message.trim()) { errors.message = "Message cannot be empty"; hasError = true; }
    if (hasError) { setFormErrors(errors); return; }

    setFormIsSending(true);
    setFormFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setFormSubmitted(true);
        setFormValues({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormFeedback(data.error || "Failed to dispatch transmission.");
      }
    } catch {
      setFormFeedback("Transmission failed. Server did not respond.");
    } finally {
      setFormIsSending(false);
    }
  };

  // ─── JSX ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative min-h-screen bg-background text-foreground bg-grid-pattern antialiased selection:bg-accent-purple/35 selection:text-white"
      suppressHydrationWarning
    >
      {/* Background Orbs */}
      <div className="orb-purple absolute top-0 left-1/4 w-[600px] h-[600px] radial-glow -z-20 pointer-events-none" />
      <div className="orb-cyan absolute top-1/3 right-1/4 w-[500px] h-[500px] radial-glow-cyan -z-20 pointer-events-none" />
      <div className="orb-blue absolute bottom-10 left-1/3 w-[700px] h-[700px] radial-glow-blue -z-20 pointer-events-none" />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="h-10 w-10 rounded-xl bg-gradient-to-tr from-accent-cyan via-accent-blue to-accent-purple flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              SK
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight group-hover:text-accent-cyan transition-colors duration-300 leading-none">
                Shavez Khan
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase mt-0.5 leading-none">
                Software Engineer
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {["home", "about", "skills", "experience", "work", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`text-[11px] font-semibold px-3.5 py-2 rounded-xl uppercase tracking-wider transition-all duration-300 border border-transparent ${
                  activeSection === item
                    ? "bg-white/5 border-white/5 text-accent-cyan shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://github.com/Shavezkhan0" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/shavez-khan-1b8910163/" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 flex-1 flex flex-col gap-32">

        {/* ── HERO ── */}
        <section id="home" className="min-h-[88vh] flex flex-col justify-center relative py-16">
          <div className="max-w-3xl flex flex-col gap-7 items-start">
            {/* Status badge */}
            <div id="hero-badge" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shadow-sm tracking-wide opacity-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Software Engineer @ Deli Cocktail House · Open to Opportunities</span>
            </div>

            {/* H1 — split words for individual animation */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] overflow-hidden">
              <span className="hero-word inline-block opacity-0">Crafting</span>{" "}
              <span className="hero-word inline-block opacity-0">Scalable</span>
              <br />
              <span className="hero-word inline-block opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">
                Full Stack
              </span>{" "}
              <span className="hero-word inline-block opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
                Systems
              </span>
            </h1>

            <div id="hero-subtitle" className="h-14 flex items-center opacity-0">
              <TypingText
                texts={["Full Stack Software Engineer", "Flutter & Mobile Developer", "Next.js & React Expert", "ERP & REST API Builder"]}
              />
            </div>

            <p id="hero-desc" className="text-slate-350 text-base md:text-lg leading-relaxed max-w-2xl font-light opacity-0">
              Hi, I'm <strong className="text-white font-semibold">Shavez Khan</strong> — a Software Engineer building production-ready ERP systems, cross-platform mobile apps, REST APIs, and intelligent automation workflows with 1+ year of hands-on experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <a href="#projects" className="hero-btn opacity-0 flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-cyan to-accent-blue px-6 font-bold text-white shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.03] transition-all duration-300">
                Explore Projects <Sparkles className="w-4 h-4" />
              </a>
              <a href="#work" className="hero-btn opacity-0 flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30 hover:border-accent-purple/60 px-6 font-bold text-white transition-all duration-300 hover:scale-[1.03]">
                View Current Work <Zap className="w-4 h-4 text-accent-cyan" />
              </a>
              <a href="#contact" className="hero-btn opacity-0 flex h-12 items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-6 font-bold text-white transition-all duration-300">
                Let's Connect <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Floating tech pills */}
          <div className="absolute right-0 top-1/4 hidden xl:flex flex-col gap-3">
            {["Next.js 16", "Flutter", "TypeScript", "PostgreSQL", "AWS", "n8n"].map((tech, i) => (
              <span key={tech}
                className="tech-pill text-[10px] font-bold px-3 py-1.5 rounded-full glass-panel border border-white/10 text-slate-400 tracking-wide"
                style={{ animationDelay: `${i * 0.4}s` }}>
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="scroll-mt-24">
          <div id="about-heading" className="flex flex-col gap-3 mb-10 overflow-hidden">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <User className="w-4 h-4" /> 01 / PROFILE SPECIFICATIONS
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">About My Technical Profile</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div id="about-spec-card" className="lg:col-span-5 flex flex-col gap-6">
              <div className="glass-panel border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-full">
                <h3 className="text-md font-bold text-white tracking-wider flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
                  <Terminal className="w-4 h-4 text-accent-cyan" /> developer_spec.json
                </h3>
                <div className="space-y-4 text-sm font-light">
                  {[
                    ["Role", "Software Engineer"],
                    ["Company", "Deli Cocktail House, Delhi"],
                    ["B.Tech Degree", "Computer Science Engineering"],
                    ["University", "GGSIPU (Delhi, India)"],
                    ["CGPA", "7.7 / 10"],
                    ["Batch", "2022 – 2026"],
                    ["Languages Spoken", "English (C1), Hindi"],
                    ["Location", "Delhi, India"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center gap-4">
                      <span className="text-slate-450 font-medium">{k}</span>
                      <span className="text-slate-200 text-right">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-4 border-t border-white/5">
                  <a href="/shavez_khan_CV.pdf" download="Shavez_Khan_CV.pdf"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-accent-cyan/10 to-accent-blue/10 hover:from-accent-cyan/20 hover:to-accent-blue/20 border border-accent-cyan/20 text-xs font-bold text-white transition-all duration-300">
                    Download CV <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div id="about-bio-card" className="lg:col-span-7 flex flex-col gap-6">
              <div className="glass-panel border border-white/5 rounded-2xl p-8 flex flex-col justify-between h-full">
                <div className="flex flex-col gap-5">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Building production-ready software with real-world impact.
                  </h3>
                  <p className="text-slate-350 text-sm leading-relaxed font-light">
                    Full stack software engineer with <strong className="text-white">1+ years of hands-on experience</strong> building production-ready web, mobile, ERP, and REST API applications. Currently at <strong className="text-accent-cyan">Deli Cocktail House</strong> where I architected a complete full-stack ERP system, cross-platform Flutter mobile app, and AI-powered WhatsApp chatbot — all deployed on AWS.
                  </p>
                  <p className="text-slate-350 text-sm leading-relaxed font-light">
                    Experienced in Flutter & Dart for cross-platform mobile development, along with React.js, Next.js, TypeScript, Node.js, Express.js, and PostgreSQL. I've worked across internships at <strong className="text-white">OneSource</strong> (remote, Colombia) and <strong className="text-white">WESEE, Indian Navy</strong> — spanning agile development teams, defense-grade BI dashboards, and scalable API architecture.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {["ERP Systems", "Cross-Platform Mobile", "REST APIs", "AWS Deployment", "AI Automation", "RBAC"].map((tag) => (
                      <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
                  <div className="flex flex-col">
                    <span ref={counter1Ref} className="text-3xl font-extrabold tracking-tight text-white">0+</span>
                    <span className="text-slate-450 text-[10px] uppercase font-bold tracking-wider mt-1">Professional Roles</span>
                  </div>
                  <div className="flex flex-col">
                    <span ref={counter2Ref} className="text-3xl font-extrabold tracking-tight text-white">0+</span>
                    <span className="text-slate-450 text-[10px] uppercase font-bold tracking-wider mt-1">LeetCode Problems</span>
                  </div>
                  <div className="flex flex-col">
                    <span ref={counter3Ref} className="text-3xl font-extrabold tracking-tight text-white">0+</span>
                    <span className="text-slate-450 text-[10px] uppercase font-bold tracking-wider mt-1">Shipped Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="scroll-mt-24">
          <div id="skills-heading" className="flex flex-col gap-3 mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <Brain className="w-4 h-4" /> 02 / SKILL MATRIX
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">Expertise & Technologies</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl bg-white/[0.02] border border-white/5">
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => setActiveSkillTab(cat.id)}
                  className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    activeSkillTab === cat.id
                      ? "bg-gradient-to-r from-accent-cyan/15 to-accent-blue/15 border border-accent-cyan/30 text-white shadow-sm"
                      : "border border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                  }`}>
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSkills.map((skill) => (
              <div key={skill.name}
                className={`skill-card glass-panel border rounded-2xl p-4 flex flex-col justify-between items-start gap-4 transition-all duration-300 hover:border-accent-cyan/25 hover:shadow-lg hover:shadow-cyan-500/5 group relative cursor-default`}>
                <span className={`text-xs font-bold tracking-tight ${skill.color}`}>{skill.name}</span>
                <div className="w-full">
                  <div className="flex justify-between items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Proficiency</span>
                    <span className="text-[10px] font-bold text-slate-350">{skill.level}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full transition-all duration-700 group-hover:from-accent-purple group-hover:to-accent-cyan"
                      style={{ width: skill.level }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="scroll-mt-24">
          <div id="exp-heading" className="flex flex-col gap-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> 03 / WORK EXPERIENCE
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">Professional Career History</p>
          </div>

          <div id="timeline-container" className="relative ml-4">
            {/* Animated Timeline Line */}
            <div id="timeline-line" className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-blue to-accent-cyan origin-top" />

            <div className="pl-8 md:pl-12 space-y-12">

              {/* Role 1 — Current */}
              <div className="exp-card relative">
                <div className="absolute -left-[45px] md:-left-[61px] top-1 h-8 w-8 rounded-full border border-emerald-500/30 bg-slate-950 flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:border-emerald-500/20 transition-colors duration-300">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-white">Software Engineer</h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Deli Cocktail House</span>
                    <span className="text-xs text-slate-450 font-medium">New Delhi</span>
                    <span className="ml-auto text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 animate-pulse">● CURRENT</span>
                  </div>
                  <p className="text-xs font-bold tracking-wider text-slate-450 uppercase">Jan 2026 – Present</p>
                  <ul className="space-y-2.5">
                    {[
                      <>Designed and developed a <strong className="text-white">full-stack ERP</strong> for HR, payroll, attendance, inventory, and event management using Next.js 16, Node.js, Prisma, and PostgreSQL — deployed on <strong className="text-white">AWS</strong>.</>,
                      <>Built an <strong className="text-white">Admin Web Panel</strong> with role-based access control for managing employees, attendance, payroll, inventory, events, and operational workflows.</>,
                      <>Developed an <strong className="text-white">Employee Web Panel</strong> for secure attendance, salary, and event access with OTP + JWT authentication.</>,
                      <>Built a cross-platform <strong className="text-white">Employee Mobile App</strong> using Flutter & Dart with full REST API synchronization for Android and iOS.</>,
                      <>Implemented <strong className="text-white">AI-powered WhatsApp chatbot</strong> using n8n workflow automation — handles client FAQs, menu queries, and escalations automatically.</>,
                      <>Tested all REST APIs using <strong className="text-white">Postman</strong>; handled deployment, debugging, and data validation throughout the development lifecycle.</>,
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-2 pt-4 border-t border-white/5">
                    {["Flutter", "Dart", "Next.js 16", "React 19", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis", "AWS", "n8n", "Turborepo"].map((t) => (
                      <span key={t} className="text-[9px] font-medium px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Role 2 */}
              <div className="exp-card relative">
                <div className="absolute -left-[45px] md:-left-[61px] top-1 h-8 w-8 rounded-full border border-white/5 bg-slate-950 flex items-center justify-center shadow-md">
                  <div className="h-3 w-3 rounded-full bg-accent-purple animate-pulse" />
                </div>
                <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:border-accent-purple/20 transition-colors duration-300">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-white">Full Stack Developer Intern</h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">OneSource – Pepti Wiki</span>
                    <span className="text-xs text-slate-450 font-medium">Remote</span>
                  </div>
                  <p className="text-xs font-bold tracking-wider text-slate-450 uppercase">Nov 2025 – Jan 2026</p>
                  <ul className="space-y-2.5">
                    {[
                      <>Developed <strong className="text-white">15+ responsive UI modules</strong> using Next.js 15 and React 19 within a distributed agile development team.</>,
                      <>Integrated REST APIs using <strong className="text-white">TanStack Query</strong> and implemented authentication workflows using Supabase Auth.</>,
                      <>Assisted backend development using <strong className="text-white">Hono</strong> in a Turborepo + pnpm-based monorepo with shared packages.</>,
                      <>Participated in sprint planning, code reviews, debugging, and feature development following collaborative agile practices.</>,
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent-purple mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Role 3 */}
              <div className="exp-card relative">
                <div className="absolute -left-[45px] md:-left-[61px] top-1 h-8 w-8 rounded-full border border-white/5 bg-slate-950 flex items-center justify-center shadow-md">
                  <div className="h-3 w-3 rounded-full bg-accent-cyan animate-pulse" />
                </div>
                <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:border-accent-cyan/20 transition-colors duration-300">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-white">Application Developer Intern</h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">WESEE, Indian Navy</span>
                    <span className="text-xs text-slate-450 font-medium">New Delhi</span>
                  </div>
                  <p className="text-xs font-bold tracking-wider text-slate-450 uppercase">Jul 2025 – Oct 2025</p>
                  <ul className="space-y-2.5">
                    {[
                      <>Developed interactive <strong className="text-white">BI dashboards</strong> using React, Next.js, Tailwind CSS, Chart.js, Python/Flask, SQL databases, and CSV data processing.</>,
                      <>Implemented interactive charts, filtering, dashboard configuration, data import, and <strong className="text-white">Power BI-compatible</strong> reporting features.</>,
                      <>Built resilient backend endpoints with <strong className="text-white">Python & Flask</strong>, structured SQL indexes, and file mapping/import workflows for massive datasets.</>,
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent-cyan mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* ── CURRENT WORK SHOWCASE (Full-width pinned section) ── */}
      <section id="work" className="scroll-mt-0">
        <WorkShowcase slides={showcaseSlides} />
      </section>

      <main className="mx-auto max-w-7xl px-6 py-12 flex-1 flex flex-col gap-32">

        {/* ── PROJECTS ── */}
        <section id="projects" className="scroll-mt-24 pt-8">
          <div id="projects-heading" className="flex flex-col gap-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> 04 / KEY PROJECTS
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">Featured Engineering Work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            <div className="project-card-anim">
              <ProjectCard
                title="Data Analytics Dashboard"
                category="Full-Stack & BI"
                shortDesc="An AI-enabled analytics dashboard modeled on Power BI, providing real-time data ETL workflows, SQL database bindings, and automated chart layouts."
                features={[
                  "Built an AI-assisted analytics board parsing complex SQL structures.",
                  "Engineered data loading pipelines for rapid CSV/structured loading.",
                  "Integrated an LLM pipeline to automatically generate charts from descriptive text queries.",
                  "Deployed within a containerized Docker architecture for standard microservice scaling.",
                ]}
                tags={["Next.js", "Flask", "SQL Server", "PostgreSQL", "Chart.js", "Docker"]}
                imageSrc="/images/data_analytics_dashboard.png"
                githubUrl="https://github.com/Shavezkhan0/dashboard-monorepo"
                accentClass="bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30"
                glowClass="bg-accent-cyan/10"
              />
            </div>
            <div className="project-card-anim">
              <ProjectCard
                title="Academic Decision Support System"
                category="AI/ML & Semantic Search"
                shortDesc="An AI-powered academic support hub featuring a multi-agent backend to evaluate student metrics, map career trajectories, and search resources."
                features={[
                  "Engineered semantic research capabilities leveraging pgvector and ChromaDB embedding files.",
                  "Architected a conversational search interface connecting LangChain agents.",
                  "Coded a FastAPI server handling vector similarity calculations and ML profiling.",
                  "Designed responsive, beautiful data grid cards using React.",
                ]}
                tags={["FastAPI", "React.js", "PostgreSQL", "pgvector", "LangChain", "ChromaDB"]}
                imageSrc="/images/academic_decision_support.png"
                githubUrl="https://github.com/Shavezkhan0/AI_assignment_RAG_Twitter"
                accentClass="bg-accent-purple/15 text-accent-purple border-accent-purple/30"
                glowClass="bg-accent-purple/10"
              />
            </div>
            <div className="project-card-anim">
              <ProjectCard
                title="Multi-Portal Food Delivery"
                category="Mobile & Web App"
                shortDesc="An end-to-end food delivery network comprising customer mobile apps, restaurant order hubs, and a master dashboard for administrator oversight."
                features={[
                  "Developed the mobile application in Flutter & Dart for cross-platform utility.",
                  "Coded restaurant and administrative backends in Next.js, Node, and Express.",
                  "Designed real-time order tracking and MongoDB schemas mapping menus and transactions.",
                  "Created responsive dashboard systems for handling hundreds of parallel orders.",
                ]}
                tags={["Flutter", "Dart", "Next.js", "Node.js", "Express.js", "MongoDB"]}
                imageSrc="/images/food_delivery_platform.png"
                githubUrl="https://github.com/Shavezkhan0/Food_Ordering_Platform"
                liveUrl="https://food-ordering-platform-flame.vercel.app/"
                liveUrlAdmin="https://food-ordering-platform-7mv3.vercel.app/login"
                accentClass="bg-accent-blue/15 text-accent-blue border-accent-blue/30"
                glowClass="bg-accent-blue/10"
              />
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="scroll-mt-24">
          <div id="contact-heading" className="flex flex-col gap-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> 05 / LET'S CONNECT
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">Get in Touch with Me</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">Let's discuss new opportunities.</h3>
                  <p className="text-slate-350 text-sm font-light leading-relaxed mb-6">
                    I am actively seeking Software Engineering, Full-Stack Developer, or Mobile Developer positions. Feel free to reach out!
                  </p>
                  <div className="space-y-4">
                    <a href="mailto:shavez.khanccc@gmail.com"
                      className="contact-item flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent-cyan/30 text-slate-300 hover:text-white transition-all duration-300 group">
                      <div className="p-2 rounded-lg bg-accent-cyan/10 text-accent-cyan shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Send Email</span>
                        <span className="text-sm font-medium truncate">shavez.khanccc@gmail.com</span>
                      </div>
                    </a>
                    <a href="tel:+919311148483"
                      className="contact-item flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent-blue/30 text-slate-300 hover:text-white transition-all duration-300 group">
                      <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Call Me</span>
                        <span className="text-sm font-medium truncate">(+91) 9311148483</span>
                      </div>
                    </a>
                    <div className="contact-item flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300">
                      <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Based In</span>
                        <span className="text-sm font-medium text-white">Delhi, India</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                  <a href="https://www.linkedin.com/in/shavez-khan-1b8910163/" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                    LinkedIn <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://github.com/Shavezkhan0" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://leetcode.com/Shavezkhan0/" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                    LeetCode <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple" />
                <h3 className="text-md font-bold text-white tracking-wider flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
                  <Terminal className="w-4 h-4 text-accent-cyan animate-pulse" /> send_message.sh
                </h3>

                {formSubmitted ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                      <Send className="w-6 h-6 animate-pulse" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Transmission Successful</h4>
                    <p className="text-slate-350 text-sm max-w-sm leading-relaxed font-light">
                      Thanks for reaching out! Your message has been received. Shavez will connect with you shortly.
                    </p>
                    <div className="w-full max-w-xs p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-mono">
                      shavez@portfolio:~$ exit 0
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Your Name *</label>
                        <input type="text" name="name" value={formValues.name} onChange={handleInputChange}
                          className="w-full bg-white/[0.02] border border-white/5 focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 outline-none rounded-xl p-3.5 text-sm text-white placeholder-slate-600 transition-all font-light"
                          placeholder="Shavez Khan" />
                        {formErrors.name && <span className="text-[10px] font-semibold text-red-400">{formErrors.name}</span>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Your Email *</label>
                        <input type="email" name="email" value={formValues.email} onChange={handleInputChange}
                          className="w-full bg-white/[0.02] border border-white/5 focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 outline-none rounded-xl p-3.5 text-sm text-white placeholder-slate-600 transition-all font-light"
                          placeholder="hello@example.com" />
                        {formErrors.email && <span className="text-[10px] font-semibold text-red-400">{formErrors.email}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Subject</label>
                      <input type="text" name="subject" value={formValues.subject} onChange={handleInputChange}
                        className="w-full bg-white/[0.02] border border-white/5 focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 outline-none rounded-xl p-3.5 text-sm text-white placeholder-slate-600 transition-all font-light"
                        placeholder="Collaboration Opportunity" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Your Message *</label>
                      <textarea name="message" value={formValues.message} onChange={handleInputChange} rows={4}
                        className="w-full bg-white/[0.02] border border-white/5 focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 outline-none rounded-xl p-3.5 text-sm text-white placeholder-slate-600 transition-all resize-none font-light"
                        placeholder="I'd love to chat about a software developer opportunity..." />
                      {formErrors.message && <span className="text-[10px] font-semibold text-red-400">{formErrors.message}</span>}
                    </div>
                    {formFeedback && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                        {formFeedback}
                      </div>
                    )}
                    <button type="submit" disabled={formIsSending}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple font-bold text-white shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.01] transition-all duration-300 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                      {formIsSending ? (
                        <>Transmitting... <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /></>
                      ) : (
                        <>Transmit Message <Send className="w-4 h-4 shrink-0" /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="glass-panel border-t border-white/5 py-8 mt-24">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-450 font-medium">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Shavez Khan.</span>
            <span>Built with Next.js 16, GSAP & Lenis.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-accent-cyan transition-colors">About</a>
            <span>&bull;</span>
            <a href="#skills" className="hover:text-accent-cyan transition-colors">Skills</a>
            <span>&bull;</span>
            <a href="#work" className="hover:text-accent-cyan transition-colors">Work</a>
            <span>&bull;</span>
            <a href="#projects" className="hover:text-accent-cyan transition-colors">Projects</a>
          </div>
        </div>
      </footer>
    </div>
  );
}