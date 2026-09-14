"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, TrendingUp, LayoutGrid } from "lucide-react";
import { useRef, useState } from "react";
import { productShots } from "@/lib/product-shots";

const views = [
  { id: "top-pins", label: "Explore ranking Pins", title: "Top Pins", description: "Look closer at the content already ranking in your niche.", icon: LayoutGrid },
  { id: "keyword-explorer", label: "Find your next keyword", title: "Keyword Explorer", description: "Go beyond the obvious with A–Z and 0–9 keyword expansion.", icon: Search },
  { id: "trends", label: "Spot emerging trends", title: "Trends", description: "Explore growing searches and plan ahead of seasonal demand.", icon: TrendingUp },
] as const;

export function ProductTour() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const view = views[active];
  const shot = productShots[view.id];
  return (
    <div id="product-tour" className="product-tour">
      <div className="tour-tabs" role="tablist" aria-label="Explore PinitGrow tools">
        {views.map((item, index) => {
          const Icon = item.icon;
          return <button key={item.id} ref={(node) => { buttons.current[index] = node; }} type="button" role="tab" id={`tab-${item.id}`} aria-selected={active === index} aria-controls="tour-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => {
            let next = index;
            if (event.key === "ArrowRight") next = (index + 1) % views.length;
            else if (event.key === "ArrowLeft") next = (index + views.length - 1) % views.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = views.length - 1;
            else return;
            event.preventDefault(); setActive(next); buttons.current[next]?.focus();
          }}><Icon /><span>{item.label}</span></button>;
        })}
      </div>
      <div id="tour-panel" role="tabpanel" aria-labelledby={`tab-${view.id}`} tabIndex={0} className="tour-panel">
        <div className="tour-window-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>PinitGrow / {view.title}</span><span className="preview-label">PRODUCT PREVIEW</span></div>
        <div className="tour-image"><Image key={shot.src} src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} preload={active === 0} sizes="(min-width: 1280px) 1120px, 94vw" /></div>
        <div className="tour-caption"><div><p>{view.description}</p><p className="mt-2 text-[10px] sm:hidden">Swipe the screenshot to explore more →</p></div><Link href={`/features/${view.id}`}>Explore {view.title} <ArrowUpRight /></Link></div>
      </div>
    </div>
  );
}
