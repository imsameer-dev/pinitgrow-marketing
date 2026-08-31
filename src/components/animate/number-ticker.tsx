"use client";

import { animate, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

export function NumberTicker({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    if (!inView) return;
    const controls = animate(motionValue, value, { duration: 0.8 });
    const unsubscribe = rounded.on("change", (current) => {
      if (ref.current) ref.current.textContent = `${current}${suffix}`;
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, motionValue, rounded, suffix, value]);

  return (
    <span ref={ref} className="font-mono">
      {value}
      {suffix}
    </span>
  );
}
