"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations() {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {});
    return () => {
      ctx.current?.revert();
    };
  }, []);

  /**
   * Fade + slide up from below on scroll enter
   */
  function fadeInUp(
    selector: string,
    options: {
      delay?: number;
      stagger?: number;
      duration?: number;
      trigger?: string;
      start?: string;
      y?: number;
    } = {}
  ) {
    const {
      delay = 0,
      stagger = 0.1,
      duration = 0.8,
      trigger,
      start = "top 85%",
      y = 60,
    } = options;

    const elements = gsap.utils.toArray<HTMLElement>(selector);
    if (!elements.length) return;

    gsap.fromTo(
      elements,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trigger || elements[0],
          start,
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  /**
   * Horizontal clip reveal (text headline effect)
   */
  function horizontalReveal(
    selector: string,
    direction: "left" | "right" = "left"
  ) {
    const elements = gsap.utils.toArray<HTMLElement>(selector);
    if (!elements.length) return;

    const from =
      direction === "left" ? "inset(0 100% 0 0)" : "inset(0 0% 0 100%)";
    const to = "inset(0 0% 0 0%)";

    gsap.fromTo(
      elements,
      { clipPath: from, opacity: 0 },
      {
        clipPath: to,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  /**
   * Stagger batch animation for grid cards
   */
  function staggerGrid(containerSelector: string, itemSelector: string) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(itemSelector);
    if (!items.length) return;

    ScrollTrigger.batch(items, {
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { y: 40, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: "power3.out",
          }
        );
      },
      start: "top 88%",
    });
  }

  /**
   * Animated number counter
   */
  function counterUp(
    element: HTMLElement | null,
    target: number,
    suffix = "",
    prefix = ""
  ) {
    if (!element) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      snap: { val: 1 },
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
      },
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reset",
      },
    });
  }

  /**
   * Animate progress bar width
   */
  function animateProgressBar(barElement: HTMLElement | null, targetWidth: string) {
    if (!barElement) return;

    gsap.fromTo(
      barElement,
      { width: "0%" },
      {
        width: targetWidth,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: barElement,
          start: "top 90%",
          toggleActions: "play none none reset",
        },
      }
    );
  }

  /**
   * Timeline draw-in animation (scrubs with scroll)
   */
  function drawTimeline(lineSelector: string, triggerSelector: string) {
    const line = document.querySelector<HTMLElement>(lineSelector);
    if (!line) return;

    gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: triggerSelector,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 1,
        },
      }
    );
  }

  /**
   * Slide in from side for experience cards
   */
  function slideInFromRight(selector: string, index: number) {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;

    gsap.fromTo(
      el,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  /**
   * Hero entrance sequence (runs once on load)
   */
  function heroEntrance(selectors: {
    badge?: string;
    h1words?: string;
    subtitle?: string;
    desc?: string;
    buttons?: string;
  }) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (selectors.badge) {
      tl.fromTo(
        selectors.badge,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.2
      );
    }
    if (selectors.h1words) {
      tl.fromTo(
        selectors.h1words,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
        0.5
      );
    }
    if (selectors.subtitle) {
      tl.fromTo(
        selectors.subtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.9
      );
    }
    if (selectors.desc) {
      tl.fromTo(
        selectors.desc,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.1
      );
    }
    if (selectors.buttons) {
      tl.fromTo(
        selectors.buttons,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
        1.3
      );
    }
  }

  return {
    fadeInUp,
    horizontalReveal,
    staggerGrid,
    counterUp,
    animateProgressBar,
    drawTimeline,
    slideInFromRight,
    heroEntrance,
  };
}