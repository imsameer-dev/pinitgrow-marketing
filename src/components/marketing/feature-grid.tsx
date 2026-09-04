import {
  ArrowDown,
  BarChart3,
  Bookmark,
  Camera,
  Compass,
  FolderKanban,
  LayoutGrid,
  Search,
  Sparkles,
  Trophy,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { features } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconMap = {
  folder: FolderKanban,
  search: Search,
  spark: Sparkles,
  trophy: Trophy,
  bars: BarChart3,
  users: Compass,
  grid: LayoutGrid,
  trend: TrendingUp,
  snapshot: Camera,
  bolt: Zap,
  save: Bookmark,
};

const total = features.length;

export function FeatureGrid() {
  return (
    <Section id="features" className="overflow-visible pb-0">
      <Container>
        <SectionHeading
          kicker="One research stack"
          title="Everything you need to understand a Pinterest niche."
          lead="No filler tools. Every module answers a specific decision you need to make before you publish, rank, or scale."
        />
        <p className="mb-10 flex items-center gap-2.5 text-[13px] font-bold text-[#77716a]">
          <span className="grid size-[30px] place-items-center rounded-full border border-border bg-card">
            <ArrowDown className="size-3.5" />
          </span>
          Scroll to see the stacked feature effect
        </p>
      </Container>
      <Container className="pb-[45vh] md:pb-[70vh]">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon];
          const number = String(index + 1).padStart(2, "0");

          return (
            <article
              key={feature.id}
              className="sticky mb-8 min-h-[76vh] overflow-hidden rounded-[22px] border border-border bg-[#fffdfb] shadow-[0_22px_65px_rgba(44,31,22,0.08)] [transform:translateZ(0)] md:mb-[60px] md:min-h-[clamp(470px,72vh,690px)] md:rounded-[28px]"
              style={{
                top: `calc(var(--stack-sticky-top) + (${index} * var(--stack-gap)))`,
                zIndex: index + 1,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.8),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(239,61,56,0.06),transparent_17rem)]"
              />
              <div className="relative z-[1] grid min-h-[inherit] items-center gap-6 p-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14 md:p-[clamp(34px,6vw,76px)]">
                <div>
                  <div className="mb-5 flex items-center gap-3 md:mb-6">
                    <div className="grid size-11 place-items-center rounded-[15px] border border-border bg-[#f8f4f0] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:size-[52px]">
                      <Icon className="size-5 md:size-6" />
                    </div>
                    <span className="rounded-full bg-[#eef8f1] px-2.5 py-1.5 text-[11px] font-black text-[#19733f]">
                      {feature.badge}
                    </span>
                    <span className="ml-auto text-[13px] font-black tracking-[0.08em] text-[#b2aaa3]">
                      {number} / {String(total).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[clamp(34px,4.7vw,63px)] leading-none font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-4 max-w-[560px] text-[15px] leading-[1.72] text-muted-foreground md:text-[17px]">
                    {feature.body}
                  </p>
                  <div className="mt-7 flex items-start gap-2.5 rounded-2xl border border-[#eee6df] bg-[#faf7f4] px-[18px] py-4 text-sm leading-normal text-[#4d4945]">
                    <span>
                      <strong className="text-foreground">Decision:</strong>{" "}
                      {feature.decision}
                    </span>
                  </div>
                </div>
                <div className="flex min-h-[225px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-[#fbf9f7] p-5 md:min-h-[340px] md:p-7">
                  <FeatureVisual feature={feature} />
                </div>
              </div>
            </article>
          );
        })}
      </Container>
    </Section>
  );
}

function FeatureVisual({
  feature,
}: {
  feature: (typeof features)[number];
}) {
  if (feature.visual === "tiles") {
    return (
      <div className="grid w-full max-w-[520px] grid-cols-3 gap-4">
        {["bg-[#e6bd8c]", "bg-[#b98b57]", "bg-[#d6ad7f]"].map((color) => (
          <div
            key={color}
            className={cn(
              "relative aspect-[1/1.06] overflow-hidden rounded-[22px]",
              color,
            )}
          >
            <span className="absolute inset-4 rounded-[15px] border border-white/60" />
          </div>
        ))}
      </div>
    );
  }

  if (feature.visual === "chart") {
    return (
      <div className="relative aspect-[16/8.5] w-full max-w-[560px] overflow-hidden rounded-[18px] bg-[linear-gradient(#eee9e4_1px,transparent_1px)_0_0/100%_25%,linear-gradient(90deg,#eee9e4_1px,transparent_1px)_0_0/20%_100%,#fff]">
        <svg viewBox="0 0 600 300" preserveAspectRatio="none" className="block size-full" aria-hidden>
          <polyline
            fill="none"
            stroke="#ef3d38"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="30,245 115,180 175,210 240,115 305,155 370,72 430,105 500,50 565,70"
          />
        </svg>
      </div>
    );
  }

  if (feature.visual === "creators") {
    return (
      <div className="grid w-full max-w-[520px] grid-cols-4 items-end gap-4">
        {["#ead7cc", "#d8c7b7", "#d9b0a3", "#c7b59f"].map((color) => (
          <div key={color} className="text-center">
            <div
              className="mb-3 aspect-square w-full rounded-full border-[6px] border-white shadow-[0_0_0_1px_var(--border)]"
              style={{
                background: `radial-gradient(circle at 50% 38%, #ffd9c4 0 16%, transparent 17%), radial-gradient(circle at 50% 110%, #cb9780 0 50%, transparent 51%), ${color}`,
              }}
            />
            <span className="mx-2.5 my-1.5 block h-2 rounded-full bg-[#cfc8c2]" />
            <span className="mx-2.5 my-1.5 block h-2 rounded-full bg-[#cfc8c2]" />
          </div>
        ))}
      </div>
    );
  }

  if (feature.visual === "boards") {
    return (
      <div className="grid w-full max-w-[540px] grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="min-h-[125px] rounded-[18px] border border-border bg-card p-[18px]"
          >
            <div className="mb-3.5 h-[52px] rounded-xl bg-[linear-gradient(90deg,#f1b8b4_0_64%,#ebe5e0_64%)]" />
            <span className="mt-2 block h-2 rounded-full bg-[#d7d1cc]" />
            <span className="mt-2 block h-2 w-[68%] rounded-full bg-[#e9e4df]" />
          </div>
        ))}
      </div>
    );
  }

  if (feature.visual === "ranking") {
    const rows = [
      { rank: "#3", delta: "+4" },
      { rank: "#7", delta: "+2" },
      { rank: "#11", delta: "+6" },
      { rank: "#16", delta: "+1" },
    ];
    return (
      <div className="grid w-full max-w-[520px] gap-3.5">
        {rows.map((row) => (
          <div
            key={row.rank}
            className="grid grid-cols-[42px_1fr_55px] items-center gap-3 rounded-[15px] border border-border bg-card p-[15px]"
          >
            <span className="text-[13px] font-black text-[#8d857e]">{row.rank}</span>
            <span className="h-2.5 rounded-full bg-[#ddd6d0]" />
            <em className="text-right text-[13px] font-black not-italic text-success">
              {row.delta}
            </em>
          </div>
        ))}
      </div>
    );
  }

  if (feature.visual === "wave") {
    return (
      <div className="aspect-[16/8.5] w-full max-w-[560px] rounded-[18px] border border-[#eee8e2] bg-card p-[18px]">
        <svg viewBox="0 0 600 300" preserveAspectRatio="none" className="size-full" aria-hidden>
          <polyline
            fill="none"
            stroke="#1f9a5b"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="25,250 100,220 165,240 230,165 290,185 365,132 425,95 490,120 540,70 575,58"
          />
        </svg>
      </div>
    );
  }

  const widths =
    "barWidths" in feature && feature.barWidths
      ? feature.barWidths
      : ["86%", "69%", "78%", "54%", "63%"];

  return (
    <div className="w-full max-w-[520px]">
      {widths.map((width) => (
        <div key={width} className="my-[18px] h-[18px] overflow-hidden rounded-full bg-[#e8e3df]">
          <span className="block h-full rounded-full bg-[#efb1ae]" style={{ width }} />
        </div>
      ))}
    </div>
  );
}
