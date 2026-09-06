"use client";

import { ChangeEvent, FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Github, Linkedin, Rocket, Send } from "lucide-react";
import { useLenis } from "@/components/lenis-provider";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);
  const topBtnRef = useRef<HTMLButtonElement>(null);
  const { lenis } = useLenis();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const btn = topBtnRef.current;
    const onScroll = () => {
      const show = window.scrollY > 500;
      if (btn) btn.classList.toggle("is-visible", show);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("contact-reduced");
      return;
    }

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-kicker",
        { y: -12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        ".contact-word",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        ".contact-subline, .contact-info-item, .contact-social",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        ".contact-field, .contact-send",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 82%", toggleActions: "play none none none" },
        }
      );

      const btn = sendBtnRef.current;
      if (btn) {
        const clamp = (v: number) => Math.max(-15, Math.min(15, v));
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          gsap.to(btn, { x: clamp(dx), y: clamp(dy), duration: 0.3, ease: "power2.out", overwrite: "auto" });
        };
        const leave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
        };
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      }

      gsap.fromTo(
        ".contact-footer",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-footer", start: "top 95%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        ".footer-strike",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-footer", start: "top 95%", toggleActions: "play none none none" },
        }
      );
    });

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = { name: "", email: "", message: "" };
    let hasError = false;
    if (!values.name.trim()) {
      next.name = "Name is required";
      hasError = true;
    }
    if (!values.email.trim()) {
      next.email = "Email is required";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      next.email = "Invalid email format";
      hasError = true;
    }
    if (!values.message.trim()) {
      next.message = "Message cannot be empty";
      hasError = true;
    }
    setErrors(next);
    if (hasError) return;

    setIsSending(true);
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, subject: "" }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setFormSubmitted(true);
        setValues({ name: "", email: "", message: "" });
      } else {
        setFeedback(data.error || "Failed to send message.");
      }
    } catch {
      setFeedback("Connection failed. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const scrollTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="contact-shell">
        <div className="contact-cols">
          <div className="contact-info">
            <span className="contact-kicker">CONTACT</span>
            <h2 className="contact-heading">
              {"Let's work together".split(" ").map((word, i) => (
                <span key={i} className="contact-word">
                  {word}
                </span>
              ))}
            </h2>
            <p className="contact-subline">Have a project in mind? Let&apos;s chat.</p>

            <div className="contact-details">
              <a href="mailto:shavez.khanccc@gmail.com" className="contact-info-item">
                shavez.khanccc@gmail.com
              </a>
              <a href="tel:+919311148483" className="contact-info-item">
                +91-9311148483
              </a>
            </div>

            <div className="contact-socials">
              <a
                href="https://github.com/Shavezkhan0"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social"
                aria-label="GitHub"
              >
                <Github className="contact-social-icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/shavez-khan-1b8910163/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social"
                aria-label="LinkedIn"
              >
                <Linkedin className="contact-social-icon" />
              </a>
              <a
                href="https://leetcode.com/Shavezkhan0/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social"
                aria-label="LeetCode"
              >
                <Code2 className="contact-social-icon" />
              </a>
            </div>
          </div>

          <div className="contact-form-wrap">
            {formSubmitted ? (
              <div className="contact-success">
                <Send className="contact-success-icon" />
                <h3 className="contact-success-title">Message Sent</h3>
                <p className="contact-success-text">
                  Thanks for reaching out &mdash; Shavez will get back to you shortly.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-field">
                  <input
                    id="cf-name"
                    type="text"
                    name="name"
                    placeholder=" "
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                  />
                  <label htmlFor="cf-name">Your Name</label>
                  {errors.name && <span className="contact-error">{errors.name}</span>}
                </div>

                <div className="contact-field">
                  <input
                    id="cf-email"
                    type="email"
                    name="email"
                    placeholder=" "
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                  />
                  <label htmlFor="cf-email">Your Email</label>
                  {errors.email && <span className="contact-error">{errors.email}</span>}
                </div>

                <div className="contact-field">
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    placeholder=" "
                    value={values.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                  />
                  <label htmlFor="cf-message">Your Message</label>
                  {errors.message && <span className="contact-error">{errors.message}</span>}
                </div>

                {feedback && <div className="contact-feedback">{feedback}</div>}

                <button ref={sendBtnRef} type="submit" disabled={isSending} className="contact-send">
                  {isSending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="contact-send-icon" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <footer className="contact-footer">
          <p className="contact-footer-note">
            <span className="footer-typo-wrap">
              <span className="footer-typo">Desinged</span>
              <span className="footer-strike" aria-hidden="true" />
              <span className="footer-corrected">Designed</span>
            </span>
            &nbsp;&amp; Built by Shavez Khan
          </p>
          <p className="contact-footer-meta">
            &copy; {new Date().getFullYear()} &middot; last updated: September 4, 2026
          </p>
        </footer>
      </div>

      <button ref={topBtnRef} type="button" className="contact-top" onClick={scrollTop} aria-label="Back to top">
        <Rocket className="contact-top-icon" />
      </button>
    </section>
  );
}