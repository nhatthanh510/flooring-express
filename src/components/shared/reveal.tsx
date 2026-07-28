"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger in milliseconds, for grids of cards */
  delay?: number;
};

/**
 * Fades content up as it scrolls into view — the effect the About mockup
 * implemented with an inline IntersectionObserver.
 *
 * The reveal state lives in a data attribute rather than React state: nothing
 * else re-renders when an element scrolls in, and the markup ships visible, so
 * content stays readable without JavaScript and for anyone who prefers reduced
 * motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    node.dataset.reveal = "hidden";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-[transform,opacity] duration-700 ease-out",
        "data-[reveal=hidden]:translate-y-8 data-[reveal=hidden]:opacity-0",
        "data-[reveal=shown]:translate-y-0 data-[reveal=shown]:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
