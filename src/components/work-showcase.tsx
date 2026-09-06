"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LazyImage } from "@/components/lazy-image";

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseSlide {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  accent: string;
}

interface WorkShowcaseProps {
  slides: ShowcaseSlide[];
}

export function WorkShowcase({ slides }: WorkShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 80}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      const slideEls = track.querySelectorAll<HTMLElement>(".showcase-slide");
      slideEls.forEach((slide) => {
        gsap.fromTo(
          slide.querySelector(".slide-content"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: slide,
              containerAnimation: tween,
              start: "left 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">
          ◆ Current Role — Deli Cocktail House
        </span>
        <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Live Production Work
        </p>
      </div>

      <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col gap-2">
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full transition-none"
            style={{ width: "0%" }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            Scroll to explore →
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            {slides.length} modules
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 items-center h-full px-10 pt-24 pb-20"
        style={{ width: "max-content" }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="showcase-slide relative flex-shrink-0 w-[75vw] md:w-[55vw] lg:w-[45vw] h-[65vh] rounded-2xl overflow-hidden group"
          >
            <LazyImage
              src={slide.imageSrc}
              alt={slide.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 75vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${slide.accent}`} />
            <div className="slide-content absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {slide.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/80 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight leading-tight">
                {slide.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light line-clamp-2">
                {slide.description}
              </p>
            </div>
            <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-[10px] font-black text-white/60">
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}