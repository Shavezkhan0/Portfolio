"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { debounce } from "@/lib/debounce";

const FULL_NAME = "Shavez Khan";
const TITLE_START = "Full Stack Software Engineer";
const TITLE_STACK =
  " — Flutter — React.js — Next.js — JavaScript — TypeScript — Node.js — Python";
const FULL_TITLE = `${TITLE_START}${TITLE_STACK}`;

type AuroraBlob = {
  cx: number;
  cy: number;
  r: number;
  color: [number, number, number];
  speed: number;
  amp: number;
};

const auroraBlobs: AuroraBlob[] = [
  { cx: 0.28, cy: 0.32, r: 0.55, color: [6, 182, 212], speed: 0.16, amp: 0.06 },
  { cx: 0.7, cy: 0.5, r: 0.5, color: [139, 92, 246], speed: 0.12, amp: 0.09 },
  { cx: 0.42, cy: 0.72, r: 0.52, color: [59, 130, 246], speed: 0.1, amp: 0.07 },
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const auroraRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typeTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const [typedTitle, setTypedTitle] = useState("");

  // Aurora canvas — drifting radial blobs behind the hero
  useLayoutEffect(() => {
    const canvas = auroraRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onResize = debounce(resize, 150);
    window.addEventListener("resize", onResize);

    const drawFrame = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      context.clearRect(0, 0, w, h);
      const t = performance.now() / 1000;
      auroraBlobs.forEach((blob, i) => {
        const x = (blob.cx + Math.sin(t * blob.speed + i * 2.2) * blob.amp) * w;
        const y = (blob.cy + Math.cos(t * blob.speed * 0.85 + i * 1.4) * blob.amp) * h;
        const r = blob.r * ((w + h) / 2);
        const grad = context.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, `rgba(${blob.color.join(",")},0.075)`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = grad;
        context.fillRect(0, 0, w, h);
      });
    };

    const loop = () => {
      drawFrame();
      rafRef.current = requestAnimationFrame(loop);
    };

    if (prefersReducedMotion) {
      drawFrame();
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Master timeline + wheel fade for scroll indicator
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Aurora fades in (0s → 2s)
      tl.from(".aurora-canvas", { opacity: 0, duration: 2, ease: "power2.out" });

      // 2. Split-text name — overlaps the aurora fade
      tl.from(
        ".hero-name-char",
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
          stagger: 0.03,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=1.5"
      );

      // 3. Typewriter starts 0.5s after the name animation completes
      const startTyping = () => {
        if (typeTimerRef.current) return;
        let i = 0;
        typeTimerRef.current = window.setInterval(() => {
          i += 1;
          setTypedTitle(FULL_TITLE.slice(0, i));
          if (i >= FULL_TITLE.length && typeTimerRef.current) {
            window.clearInterval(typeTimerRef.current);
            typeTimerRef.current = null;
          }
        }, 30);
      };
      tl.call(startTyping, [], 2.5);

      // 4. Contact links — 1s after page load
      tl.from(
        ".hero-contact-item",
        {
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
        1.0
      );

      // 5. Scroll indicator fades out once the user starts scrolling
      const onScroll = () => {
        if (
          window.scrollY > 24 &&
          scrollRef.current &&
          scrollRef.current.style.opacity !== "0"
        ) {
          gsap.to(scrollRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              if (scrollRef.current) scrollRef.current.style.display = "none";
            },
          });
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => window.removeEventListener("scroll", onScroll);
    }, rootRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  // Clear the typewriter interval if the component unmounts mid-typing
  useEffect(() => {
    return () => {
      if (typeTimerRef.current !== null) {
        window.clearInterval(typeTimerRef.current);
        typeTimerRef.current = null;
      }
    };
  }, []);

  return (
    <section id="home" ref={rootRef} className="hero">
      <canvas ref={auroraRef} className="aurora-canvas" aria-hidden="true" />

      {/* Thin diagonal line, bottom-left to top-right, behind the text */}
      <svg
        className="hero-diagonal"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-diagonal-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="100"
          x2="100"
          y2="0"
          stroke="url(#hero-diagonal-grad)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.15"
        />
      </svg>

      <div className="hero-content">
        <div className="hero-name-wrap">
          {/* Name — split into per-character spans */}
          <h1 className="hero-name" aria-label={FULL_NAME}>
            {FULL_NAME.split("").map((char, i) => (
              <span key={i} className="hero-name-char" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* Handwritten squiggle near the name */}
          <svg
            className="hero-squiggle"
            viewBox="0 0 140 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 16 C 20 5, 38 18, 56 10 S 96 16, 118 4"
              stroke="#06b6d4"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Title — typewriter, mixed font-weights */}
        <p className="hero-title" aria-label={FULL_TITLE}>
          <span style={{ fontWeight: 500 }}>
            {typedTitle.slice(0, TITLE_START.length)}
          </span>
          <span style={{ fontWeight: 400 }}>
            {typedTitle.slice(TITLE_START.length)}
          </span>
          <span className="hero-title-cursor">|</span>
        </p>

        {/* Contact row */}
        <div className="hero-contact-row">
          <span className="hero-contact-item">+91-9311148483</span>
          <span className="hero-contact-item" aria-hidden="true">|</span>
          <span className="hero-contact-item">shavez.khanccc@gmail.com</span>
          <span className="hero-contact-item" aria-hidden="true">|</span>
          <a href="#" className="hero-contact-item hero-contact-link">
            Portfolio
          </a>
          <span className="hero-contact-item" aria-hidden="true">|</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-contact-item hero-contact-link"
          >
            GitHub
          </a>
          <span className="hero-contact-item" aria-hidden="true">|</span>
          <a href="#" className="hero-contact-item hero-contact-link">
            LinkedIn
          </a>
          <span className="hero-contact-item" aria-hidden="true">|</span>
          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-contact-item hero-contact-link"
          >
            LeetCode
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="hero-scroll-indicator" aria-hidden="true">
        <ChevronDown className="h-4 w-4" strokeWidth={2} />
      </div>

      {/* Terminal decoration */}
      <div className="hero-terminal" aria-hidden="true">
        <div className="hero-terminal-bar">
          <span className="hero-terminal-dot hero-terminal-dot-red" />
          <span className="hero-terminal-dot hero-terminal-dot-yellow" />
          <span className="hero-terminal-dot hero-terminal-dot-green" />
        </div>
        <p className="hero-terminal-text">
          <span className="hero-terminal-keyword">const</span>{" "}
          developer ={" "}
          <span className="hero-terminal-string">&quot;Shavez&quot;</span>;
          <span className="hero-terminal-cursor">|</span>
        </p>
      </div>
    </section>
  );
}