"use client";

import "lenis/dist/lenis.css";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [reduce, setReduce] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => setReduce(mediaQuery.matches);

    applyPreference();
    mediaQuery.addEventListener("change", applyPreference);
    return () => mediaQuery.removeEventListener("change", applyPreference);
  }, []);

  if (reduce !== false) return children;

  return (
    <ReactLenis root options={{ lerp: 0.1, autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
