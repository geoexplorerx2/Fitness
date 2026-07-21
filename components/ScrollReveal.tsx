"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollReveal - A scroll-triggered animation component
 *
 * Uses IntersectionObserver (more performant than scroll event listeners)
 * to reveal elements with various CSS transition effects when they enter
 * the viewport. Supports multiple animation types: fade-up, fade-right,
 * fade-left, and scale-in.
 *
 * To use, add one of these classes to any element:
 *   - .reveal       → fades up (translateY)
 *   - .reveal-right → slides in from right
 *   - .reveal-left  → slides in from left
 *   - .reveal-scale → scales in from 0.88
 *
 * Staggered children are supported via CSS custom property --i:
 *   style={{ '--i': index }}
 *   Delay = index × 0.1s
 */
export default function ScrollReveal() {
  // Store observer ref so it can be cleaned up
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const SELECTORS = ".reveal, .reveal-right, .reveal-left, .reveal-scale";

    // Mark all target elements as hidden on mount
    document.querySelectorAll(SELECTORS).forEach((el) => {
      el.classList.add("reveal-hidden");
    });

    // Set up IntersectionObserver — no scroll event listener needed
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-hidden");
            entry.target.classList.add("visible");
            // Stop observing once revealed to free resources
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -60px 0px", // triggers 60px before element enters viewport
        threshold: 0,
      }
    );

    const elements = document.querySelectorAll(SELECTORS);
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return null;
}
