"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export function NumberTicker({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    return rounded.on("change", setDisplayValue);
  }, [rounded]);

  useEffect(() => {
    if (reduceMotion || !inView) {
      motionValue.set(value);
      setDisplayValue(value);
      return;
    }

    if (motionValue.get() === value) return;

    const controls = animate(motionValue, value, { duration: 0.8 });
    return () => controls.stop();
  }, [inView, motionValue, reduceMotion, value]);

  return (
    <span ref={ref} className="font-mono">
      {displayValue}
      {suffix}
    </span>
  );
}
