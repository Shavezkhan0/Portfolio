"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, Github, Link2 } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  shortDesc: string;
  features: string[];
  tags: string[];
  imageSrc: string;
  githubUrl?: string;
  liveUrl?: string;
  accentClass: string;
  glowClass: string;
}

export function ProjectCard({
  title,
  category,
  shortDesc,
  features,
  tags,
  imageSrc,
  githubUrl,
  liveUrl,
  accentClass,
  glowClass,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-panel glass-panel-hover overflow-hidden rounded-2xl flex flex-col h-full border border-white/5 relative group">
      {/* Glow Overlay on Card Hover */}
      <div className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none -z-10 ${glowClass}`}></div>
      
      {/* Interactive Project Preview Image */}
      <div className="relative h-52 w-full overflow-hidden border-b border-white/5 bg-slate-950">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80"></div>
        <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full border border-white/10 backdrop-blur-md text-white shadow-sm ${accentClass}`}>
          {category}
        </span>
      </div>

      {/* Main Contents */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-300"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-300"
                title="View Live Site"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-slate-350 text-sm leading-relaxed mb-4 flex-1">
          {shortDesc}
        </p>

        {/* Dynamic Details Expansion */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-72 opacity-100 mb-5" : "max-h-0 opacity-0"}`}>
          <div className="border-t border-white/5 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450 mb-3 flex items-center gap-1.5">
              Key Features & Contribution
            </h4>
            <ul className="space-y-2">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Interactive Learn More Trigger */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-slate-300 hover:text-white transition-all duration-300"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Explore Architecture & Features <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
