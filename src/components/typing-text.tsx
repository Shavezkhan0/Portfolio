"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

export function TypingText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
}: TypingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = texts[currentTextIndex];

    if (isDeleting) {
      // Deleting character behavior
      timer = setTimeout(() => {
        if (currentText.length <= 1) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        } else {
          setCurrentText((prev) => prev.slice(0, -1));
        }
      }, deletingSpeed);
    } else {
      // Typing character behavior
      timer = setTimeout(() => {
        setCurrentText((prev) => fullText.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // Handle transition when typing completes
    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenTexts);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple tracking-wide md:text-5xl text-3xl">
      {currentText}
      <span className="absolute -right-2 top-0 bottom-0 w-[3px] bg-accent-cyan animate-pulse animate-duration-1000"></span>
    </span>
  );
}
