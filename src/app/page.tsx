"use client";

import { useEffect, useState } from "react";
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
  Wrench
} from "lucide-react";
import { TypingText } from "@/components/typing-text";
import { ProjectCard } from "@/components/project-card";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeSkillTab, setActiveSkillTab] = useState("all");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });

  // Custom Scroll Spy logic using IntersectionObserver
  useEffect(() => {
    const sections = ["home", "about", "skills", "experience", "projects", "contact"];
    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px -20px 0px" }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Handle skills filtering
  const skillCategories = [
    { id: "all", name: "All Skills", icon: Layers },
    { id: "frontend", name: "Frontend", icon: Globe },
    { id: "backend", name: "Backend & Auth", icon: Code2 },
    { id: "ai", name: "AI / ML / Data", icon: Cpu },
    { id: "databases", name: "Databases", icon: Database },
    { id: "tools", name: "Tools & OS", icon: Wrench },
  ];

  const allSkills = [
    // Frontend
    { name: "React.js", category: "frontend", level: "90%", color: "text-cyan-400 border-cyan-500/30" },
    { name: "Next.js 15", category: "frontend", level: "95%", color: "text-white border-white/35" },
    { name: "TailwindCSS", category: "frontend", level: "90%", color: "text-sky-400 border-sky-500/35" },
    { name: "HTML / CSS", category: "frontend", level: "85%", color: "text-orange-400 border-orange-500/30" },
    { name: "React Query", category: "frontend", level: "85%", color: "text-red-400 border-red-500/30" },
    
    // Backend
    { name: "Node.js", category: "backend", level: "85%", color: "text-green-400 border-green-500/30" },
    { name: "FastAPI", category: "backend", level: "80%", color: "text-teal-400 border-teal-500/30" },
    { name: "Express.js", category: "backend", level: "80%", color: "text-yellow-400 border-yellow-500/30" },
    { name: "Hono", category: "backend", level: "75%", color: "text-orange-400 border-orange-500/30" },
    { name: "REST APIs", category: "backend", level: "90%", color: "text-indigo-400 border-indigo-500/30" },
    { name: "Supabase Auth", category: "backend", level: "80%", color: "text-emerald-400 border-emerald-500/30" },
    
    // AI/ML
    { name: "Python", category: "tools", level: "90%", color: "text-yellow-300 border-yellow-500/35" },
    { name: "Pandas", category: "ai", level: "85%", color: "text-indigo-300 border-indigo-500/30" },
    { name: "NumPy", category: "ai", level: "80%", color: "text-blue-300 border-blue-500/30" },
    { name: "Scikit-learn", category: "ai", level: "75%", color: "text-orange-300 border-orange-500/30" },
    { name: "RAG Pipelines", category: "ai", level: "85%", color: "text-pink-400 border-pink-500/30" },
    { name: "Vector Embeddings", category: "ai", level: "80%", color: "text-violet-400 border-violet-500/30" },
    { name: "LangChain", category: "ai", level: "85%", color: "text-emerald-300 border-emerald-500/30" },
    
    // Databases
    { name: "PostgreSQL", category: "databases", level: "85%", color: "text-sky-300 border-sky-500/30" },
    { name: "MongoDB Atlas", category: "databases", level: "80%", color: "text-green-500 border-green-500/30" },
    { name: "Supabase", category: "databases", level: "85%", color: "text-emerald-500 border-emerald-500/30" },
    { name: "SQL Server", category: "databases", level: "85%", color: "text-red-400 border-red-500/30" },
    { name: "ChromaDB", category: "databases", level: "75%", color: "text-purple-400 border-purple-500/30" },
    
    // Tools
    { name: "TypeScript", category: "tools", level: "85%", color: "text-blue-500 border-blue-500/30" },
    { name: "JavaScript", category: "tools", level: "90%", color: "text-yellow-400 border-yellow-500/30" },
    { name: "Flutter & Dart", category: "tools", level: "80%", color: "text-cyan-400 border-cyan-500/30" },
    { name: "Docker", category: "tools", level: "80%", color: "text-sky-500 border-sky-500/30" },
    { name: "GitHub", category: "tools", level: "90%", color: "text-white border-white/30" },
    { name: "Turborepo", category: "tools", level: "80%", color: "text-pink-500 border-pink-500/30" }
  ];

  const filteredSkills = activeSkillTab === "all" 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeSkillTab);

  // Form submission handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = { name: "", email: "", message: "" };
    let hasError = false;

    if (!formValues.name.trim()) {
      errors.name = "Name is required";
      hasError = true;
    }
    if (!formValues.email.trim()) {
      errors.email = "Email is required";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Invalid email format";
      hasError = true;
    }
    if (!formValues.message.trim()) {
      errors.message = "Message cannot be empty";
      hasError = true;
    }

    if (hasError) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitted(true);
    // Reset values after a mock success
    setTimeout(() => {
      setFormValues({ name: "", email: "", subject: "", message: "" });
      setFormSubmitted(false);
    }, 6000);
  };

  return (
    <div
      className="relative min-h-screen bg-background text-foreground bg-grid-pattern antialiased selection:bg-accent-purple/35 selection:text-white"
      suppressHydrationWarning
    >
      {/* Abstract Glowing Orbs in Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] radial-glow -z-20 pointer-events-none animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] radial-glow-cyan -z-20 pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] radial-glow -z-20 pointer-events-none"></div>

      {/* STICKY GLASS HEADER */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="h-10 w-10 rounded-xl bg-gradient-to-tr from-accent-cyan via-accent-blue to-accent-purple flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
              SK
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight group-hover:text-accent-cyan transition-colors duration-300 leading-none">
                Shavez Khan
              </span>
              <span className="text-[10px] text-slate-450 tracking-wider font-semibold uppercase mt-0.5 leading-none">
                Portfolio
              </span>
            </div>
          </a>

          {/* Nav items */}
          <nav className="hidden md:flex items-center gap-1.5">
            {["home", "about", "skills", "experience", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`text-xs font-semibold px-4 py-2 rounded-xl uppercase tracking-wider transition-all duration-300 border border-transparent ${
                  activeSection === item
                    ? "bg-white/5 border-white/5 text-accent-cyan shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Socials / Action */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Shavezkhan0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shavez-khan-1b8910163/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              title="LinkedIn Connection"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 flex-1 flex flex-col gap-32">
        {/* HERO SECTION */}
        <section id="home" className="min-h-[80vh] flex flex-col justify-center relative py-12">
          <div className="max-w-3xl flex flex-col gap-6 items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shadow-sm tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Available for Software Engineering Roles</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Crafting Scalable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">
                AI Systems & Apps
              </span>
            </h1>

            <div className="h-16 flex items-center">
              <TypingText
                texts={["Full-Stack Developer", "AI/ML Systems Engineer", "Computer Science Graduate"]}
              />
            </div>

            <p className="text-slate-350 text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Hi, I'm <strong className="text-white font-semibold">Shavez Khan</strong>, a Computer Science Engineer from GGSIPU. I specialize in developing full-stack web applications, AI-enabled data dashboards, and intelligent semantic-driven platforms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <a
                href="#projects"
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-cyan to-accent-blue px-6 font-bold text-white shadow-lg hover:shadow-cyan-500/15 hover:scale-[1.02] transition-all duration-300"
              >
                Explore Projects <Sparkles className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-6 font-bold text-white transition-all duration-300"
              >
                Let's Connect <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="scroll-mt-24">
          <div className="flex flex-col gap-3 mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <User className="w-4 h-4" /> 01 / PROFILE SPECIFICATIONS
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">About My Technical Profile</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Spec sheet grid */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="glass-panel border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-full">
                <h3 className="text-md font-bold text-white tracking-wider flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
                  <Terminal className="w-4 h-4 text-accent-cyan" /> developer_spec.json
                </h3>
                
                <div className="space-y-4 text-sm font-light">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-450 font-medium">B.Tech Degree</span>
                    <span className="text-slate-200 text-right">Computer Science Engineering</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-450 font-medium">University</span>
                    <span className="text-slate-200 text-right">GGSIPU (Delhi, India)</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-450 font-medium">B.Tech Grade (CGPA)</span>
                    <span className="text-slate-200 text-right">7.3 (Current) / 7.7 (Expected)</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-450 font-medium">Date of Birth</span>
                    <span className="text-slate-200 text-right">01 / 01 / 2003</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-450 font-medium">Location</span>
                    <span className="text-slate-200 text-right">Delhi, India (Indian Native)</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-450 font-medium">Languages</span>
                    <span className="text-slate-200 text-right">English (C1 Proficient), Hindi</span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <a
                    href="#contact"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold text-white transition-all duration-300"
                  >
                    Request Detailed CV <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Core Values / Professional bio */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="glass-panel border border-white/5 rounded-2xl p-8 flex flex-col justify-between h-full">
                <div className="flex flex-col gap-5">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Engineering scalable applications with real-world impact.
                  </h3>
                  
                  <p className="text-slate-350 text-sm leading-relaxed font-light">
                    As a dedicated Computer Science graduate with hands-on internship experience across diverse environments (ranging from high-speed Remote tech consultancies in Colombia to highly secure defense research centers like WESEE, Indian Navy), I thrive at the intersection of full-stack system architecture and machine learning pipelines.
                  </p>
                  
                  <p className="text-slate-350 text-sm leading-relaxed font-light">
                    My engineering process integrates clean backend layouts (Node, Flask, Hono, FastAPI), rapid-loading responsive frontends (Next.js, React, Tailwind), and semantic vectors (ChromaDB, pgvector, LLMs) to build secure dashboards, dashboards, and automated AI agents.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-3xl font-extrabold tracking-tight text-white">2+</span>
                    <span className="text-slate-450 text-[10px] uppercase font-bold tracking-wider mt-1">Professional Internships</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-extrabold tracking-tight text-white">4.0+</span>
                    <span className="text-slate-450 text-[10px] uppercase font-bold tracking-wider mt-1">B.Tech Years</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-extrabold tracking-tight text-white">10+</span>
                    <span className="text-slate-450 text-[10px] uppercase font-bold tracking-wider mt-1">Developed Tech Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="scroll-mt-24">
          <div className="flex flex-col gap-3 mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <Brain className="w-4 h-4" /> 02 / SKILL MATRIX
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">Expertise & Technologies</p>
          </div>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl bg-white/[0.02] border border-white/5">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveSkillTab(category.id)}
                  className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    activeSkillTab === category.id
                      ? "bg-gradient-to-r from-accent-cyan/15 to-accent-blue/15 border border-accent-cyan/30 text-white shadow-sm"
                      : "border border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Skill Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className={`glass-panel border rounded-2xl p-4 flex flex-col justify-between items-start gap-4 transition-all duration-300 hover:border-accent-cyan/20 hover:shadow-cyan-500/5 group relative`}
              >
                <span className={`text-xs font-bold tracking-tight ${skill.color}`}>
                  {skill.name}
                </span>
                
                <div className="w-full">
                  <div className="flex justify-between items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider">Proficiency</span>
                    <span className="text-[10px] font-bold text-slate-350">{skill.level}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full transition-all duration-500 group-hover:from-accent-purple group-hover:to-accent-cyan"
                      style={{ width: skill.level }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section id="experience" className="scroll-mt-24">
          <div className="flex flex-col gap-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> 03 / WORK EXPERIENCE
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">Professional Career History</p>
          </div>

          <div className="relative border-l border-white/5 ml-4 pl-8 md:pl-12 space-y-12">
            {/* Role 1 */}
            <div className="relative">
              {/* Orb node */}
              <div className="absolute -left-[45px] md:-left-[61px] top-1 h-8 w-8 rounded-full border border-white/5 bg-slate-950 flex items-center justify-center text-accent-purple shadow-md">
                <div className="h-3.5 w-3.5 rounded-full bg-accent-purple animate-pulse"></div>
              </div>

              <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:justify-between gap-6">
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      Full Stack Developer Intern
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">
                      OneSource
                    </span>
                    <span className="text-xs text-slate-450 font-medium">Remote (Colombia)</span>
                  </div>

                  <p className="text-xs font-bold tracking-wider text-slate-450 uppercase">
                    Nov 20, 2025 – Jan 20, 2026
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-purple mt-2 shrink-0"></div>
                      <span>Developed responsive frontend applications utilizing <strong className="text-white">Next.js 15 & React 19</strong>, ensuring optimal load speeds and clean layout transitions.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-purple mt-2 shrink-0"></div>
                      <span>Constructed modular, highly reusable UI components styled with Tailwind CSS in a <strong className="text-white">Turborepo + pnpm monorepo</strong> ecosystem.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-purple mt-2 shrink-0"></div>
                      <span>Integrated REST APIs and structured state tracking with <strong className="text-white">React Query</strong> for high-frame-rate database synchronization.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-purple mt-2 shrink-0"></div>
                      <span>Created backend routing services using the <strong className="text-white">Hono framework</strong>, including data modeling and Supabase Authentication pipelines.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-purple mt-2 shrink-0"></div>
                      <span>Co-authored the Admin Control Hub, Public Knowledgebase (Pepti Wiki), and Influencer Portal.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Role 2 */}
            <div className="relative">
              {/* Orb node */}
              <div className="absolute -left-[45px] md:-left-[61px] top-1 h-8 w-8 rounded-full border border-white/5 bg-slate-950 flex items-center justify-center text-accent-cyan shadow-md">
                <div className="h-3.5 w-3.5 rounded-full bg-accent-cyan animate-pulse"></div>
              </div>

              <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:justify-between gap-6">
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      Application Developer Intern
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
                      WESEE, Indian Navy
                    </span>
                    <span className="text-xs text-slate-450 font-medium">Delhi, India</span>
                  </div>

                  <p className="text-xs font-bold tracking-wider text-slate-450 uppercase">
                    Jul 7, 2025 – Oct 7, 2025
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-cyan mt-2 shrink-0"></div>
                      <span>Developed a highly secure <strong className="text-white">Business Intelligence Dashboard</strong> with real-time data ingestion and analytics filters.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-cyan mt-2 shrink-0"></div>
                      <span>Integrated interactive metrics charts and radar tracking using <strong className="text-white">Chart.js</strong> for tactical visual assessment.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-cyan mt-2 shrink-0"></div>
                      <span>Built resilient, lightning-fast background endpoints with <strong className="text-white">Python & Flask</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-cyan mt-2 shrink-0"></div>
                      <span>Authored SQL database setups, structured indexes, and built file mapping/import workflows for massive datasets.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-light">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-cyan mt-2 shrink-0"></div>
                      <span>Programmed BI templates by compiling Power BI-compatible <strong className="text-white">.pbir structures</strong>.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-24">
          <div className="flex flex-col gap-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> 04 / KEY PROJECTS
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">Featured Engineering Work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="Data Analytics Dashboard"
              category="Full-Stack & BI"
              shortDesc="An AI-enabled analytics dashboard modeled on Power BI, providing real-time data ETL workflows, SQL database bindings, and automated chart layouts."
              features={[
                "Built an AI-assisted analytics board parsing complex SQL structures.",
                "Engineered data loading pipelines for rapid CSV/structured loading.",
                "Integrated an LLM pipeline to automatically generate charts from descriptive text queries.",
                "Deployed within a containerized Docker architecture for standard microservice scaling."
              ]}
              tags={["Next.js", "Flask", "SQL Server", "PostgreSQL", "Chart.js", "Docker"]}
              imageSrc="/images/data_analytics_dashboard.png"
              githubUrl="https://github.com/Shavezkhan0/dashboard-monorepo"
              accentClass="bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30"
              glowClass="bg-accent-cyan/10"
            />

            <ProjectCard
              title="Academic Decision Support System"
              category="AI/ML & Semantic Search"
              shortDesc="An AI-powered academic support hub featuring a multi-agent backend to evaluate student metrics, map career trajectories, and search resources."
              features={[
                "Engineered semantic research capabilities leveraging pgvector and ChromaDB embedding files.",
                "Architected a conversational search interface connecting LangChain agents.",
                "Coded a FastAPI server handling vector similarity calculations and ML profiling.",
                "Designed responsive, beautiful data grid cards using React."
              ]}
              tags={["FastAPI", "React.js", "PostgreSQL", "pgvector", "LangChain", "ChromaDB"]}
              imageSrc="/images/academic_decision_support.png"
              githubUrl="https://github.com/Shavezkhan0/AI_assignment_RAG_Twitter"
              accentClass="bg-accent-purple/15 text-accent-purple border-accent-purple/30"
              glowClass="bg-accent-purple/10"
            />

            <ProjectCard
              title="Multi-Portal Food Delivery"
              category="Mobile & Web App"
              shortDesc="An end-to-end food delivery network comprising customer mobile apps, restaurant order hubs, and a master dashboard for administrator oversight."
              features={[
                "Developed the mobile application in Flutter & Dart for cross-platform utility.",
                "Coded restaurant and administrative backends in Next.js, Node, and Express.",
                "Designed real-time order tracking and MongoDB schemas mapping menus and transactions.",
                "Created responsive dashboard systems for handling hundreds of parallel orders."
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
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24">
          <div className="flex flex-col gap-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> 05 / LET'S CONNECT
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">Get in Touch with Me</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Quick Connections Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    Let's discuss new opportunities.
                  </h3>
                  <p className="text-slate-350 text-sm font-light leading-relaxed mb-6">
                    I am actively seeking Software Engineering, Full-Stack Developer, or AI/ML Developer positions. Feel free to contact me directly using any of the routes below!
                  </p>

                  <div className="space-y-4">
                    <a
                      href="mailto:shavez.khanccc@gmail.com"
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent-cyan/30 text-slate-300 hover:text-white transition-all duration-300 group"
                    >
                      <div className="p-2 rounded-lg bg-accent-cyan/10 text-accent-cyan shrink-0 group-hover:scale-105 transition-transform">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Send Email</span>
                        <span className="text-sm font-medium truncate">shavez.khanccc@gmail.com</span>
                      </div>
                    </a>

                    <a
                      href="tel:+919311148483"
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent-blue/30 text-slate-300 hover:text-white transition-all duration-300 group"
                    >
                      <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue shrink-0 group-hover:scale-105 transition-transform">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Call Me</span>
                        <span className="text-sm font-medium truncate">(+91) 9311148483</span>
                      </div>
                    </a>

                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300">
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
                  <a
                    href="https://www.linkedin.com/in/shavez-khan-1b8910163/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    LinkedIn <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/Shavezkhan0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Form */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple"></div>
                
                <h3 className="text-md font-bold text-white tracking-wider flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
                  <Terminal className="w-4 h-4 text-accent-cyan animate-pulse" /> send_message.sh
                </h3>

                {formSubmitted ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-4 animate-float">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                      <Send className="w-6 h-6 animate-pulse" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Transmission Successful</h4>
                    <p className="text-slate-350 text-sm max-w-sm leading-relaxed font-light">
                      Thanks for reaching out! Your message has been logged to the terminal index. Shavez will connect with you shortly.
                    </p>
                    <div className="w-full max-w-xs p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-mono">
                      shavez@home:~$ exit
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formValues.name}
                          onChange={handleInputChange}
                          className="w-full bg-white/[0.02] border border-white/5 focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 outline-none rounded-xl p-3.5 text-sm text-white placeholder-slate-600 transition-all font-light"
                          placeholder="Shavez Khan"
                        />
                        {formErrors.name && (
                          <span className="text-[10px] font-semibold text-red-400">{formErrors.name}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/[0.02] border border-white/5 focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 outline-none rounded-xl p-3.5 text-sm text-white placeholder-slate-600 transition-all font-light"
                          placeholder="shavez.khanccc@gmail.com"
                        />
                        {formErrors.email && (
                          <span className="text-[10px] font-semibold text-red-400">{formErrors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formValues.subject}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.02] border border-white/5 focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 outline-none rounded-xl p-3.5 text-sm text-white placeholder-slate-600 transition-all font-light"
                        placeholder="Collaboration Opportunity"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formValues.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full bg-white/[0.02] border border-white/5 focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 outline-none rounded-xl p-3.5 text-sm text-white placeholder-slate-600 transition-all resize-none font-light"
                        placeholder="I'd love to chat about a software developer opportunity at our firm..."
                      />
                      {formErrors.message && (
                        <span className="text-[10px] font-semibold text-red-400">{formErrors.message}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-4.5 px-6 rounded-xl bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple font-bold text-white shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.01] transition-all duration-300 mt-4 cursor-pointer"
                    >
                      Transmit Message <Send className="w-4 h-4 shrink-0" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="glass-panel border-t border-white/5 py-8 mt-24">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-450 font-medium">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Shavez Khan.</span>
            <span>All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-accent-cyan transition-colors">About</a>
            <span>&bull;</span>
            <a href="#skills" className="hover:text-accent-cyan transition-colors">Skills</a>
            <span>&bull;</span>
            <a href="#projects" className="hover:text-accent-cyan transition-colors">Projects</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
