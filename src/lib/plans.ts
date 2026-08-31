export type PlanCode = "creator" | "professional" | "studio";

export type PlanRow = { label: string; value: string };

export type Plan = {
  code: PlanCode;
  name: string;
  priceLabel: string;
  pitch: string;
  featured: boolean;
  rows: PlanRow[];
};

export const trialDays = 3;

export const plans: Plan[] = [
  {
    code: "creator",
    name: "Creator",
    priceLabel: "$9.99",
    pitch: "Solo creators who research a few niches a day.",
    featured: false,
    rows: [
      { label: "Keyword Explorer", value: "20/day" },
      { label: "Ideas searches", value: "5/day" },
      { label: "Top Pins searches", value: "3/day" },
      { label: "Pin Stats scans", value: "5/day" },
      { label: "Account Explorer", value: "5/day" },
      { label: "Board Explorer", value: "5/day" },
      { label: "New research projects", value: "2/day" },
      { label: "Maximum pins/search", value: "100" },
      { label: "Stored projects", value: "10" },
      { label: "Active trackers", value: "5" },
      { label: "Tracker history", value: "30 days" },
    ],
  },
  {
    code: "professional",
    name: "Professional",
    priceLabel: "$29.99",
    pitch: "Agencies and publishers who live in rank tracking.",
    featured: true,
    rows: [
      { label: "Keyword Explorer", value: "40/day" },
      { label: "Ideas searches", value: "15/day" },
      { label: "Top Pins searches", value: "10/day" },
      { label: "Pin Stats scans", value: "20/day" },
      { label: "Account Explorer", value: "15/day" },
      { label: "Board Explorer", value: "15/day" },
      { label: "New research projects", value: "5/day" },
      { label: "Maximum pins/search", value: "300" },
      { label: "Stored projects", value: "50" },
      { label: "Active trackers", value: "25" },
      { label: "Tracker history", value: "90 days" },
    ],
  },
  {
    code: "studio",
    name: "Studio",
    priceLabel: "$85.99",
    pitch: "High-volume teams that need the full daily capacity.",
    featured: false,
    rows: [
      { label: "Keyword Explorer", value: "100/day" },
      { label: "Ideas searches", value: "50/day" },
      { label: "Top Pins searches", value: "25/day" },
      { label: "Pin Stats scans", value: "50/day" },
      { label: "Account Explorer", value: "50/day" },
      { label: "Board Explorer", value: "50/day" },
      { label: "New research projects", value: "10/day" },
      { label: "Maximum pins/search", value: "500" },
      { label: "Stored projects", value: "200" },
      { label: "Active trackers", value: "75" },
      { label: "Tracker history", value: "365 days" },
    ],
  },
];
