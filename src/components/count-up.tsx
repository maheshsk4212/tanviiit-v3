"use client";

import { useEffect, useState } from "react";

/**
 * Counts from zero to `to` once, after `delay`. The server renders the final
 * number, so the figure is correct without JavaScript and for anyone who has
 * asked for reduced motion.
 */
export function CountUp({ to, delay = 0, duration = 1100 }: { to: number; delay?: number; duration?: number }) {
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const reset = requestAnimationFrame(() => setValue(0));
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * to));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(reset);
      cancelAnimationFrame(frame);
    };
  }, [to, delay, duration]);

  return (
    <>
      <span aria-hidden>{value}</span>
      <span className="sr-only">{to}</span>
    </>
  );
}
