export type PlanCode = "creator" | "professional" | "studio";

export type PlanRow = { label: string; value: string };

export type Plan = {
  code: PlanCode;
  name: string;
  priceLabel: string;
  monthlyPrice: string;
  pitch: string;
  featured: boolean;
  rows: PlanRow[];
};

export const trialDays = 3;

export const trialLimits = {
  keyword_expand: 5,
  annotation_explorer: 2,
  top_pins: 1,
  pin_stats: 2,
  account_explorer: 2,
  board_explorer: 2,
  research_project: 1,
  rank_tracker: 2,
  search_tracker: 2,
  max_pins_per_search: 100,
  stored_projects: 3,
  active_trackers: 2,
  tracker_history_days: 3,
} as const;

function entitlementRows(limits: {
  keyword_expand: number;
  annotation_explorer: number;
  top_pins: number;
  pin_stats: number;
  account_explorer: number;
  board_explorer: number;
  research_project: number;
  rank_tracker: number;
  search_tracker: number;
  max_pins_per_search: number;
  stored_projects: number;
  active_trackers: number;
  tracker_history_days: number;
}): PlanRow[] {
  return [
    { label: "Keyword Explorer", value: `${limits.keyword_expand}/day` },
    { label: "Ideas searches", value: `${limits.annotation_explorer}/day` },
    { label: "Top Pins searches", value: `${limits.top_pins}/day` },
    { label: "Pin Stats scans", value: `${limits.pin_stats}/day` },
    { label: "Account Explorer", value: `${limits.account_explorer}/day` },
    { label: "Board Explorer", value: `${limits.board_explorer}/day` },
    { label: "New research projects", value: `${limits.research_project}/day` },
    { label: "Rank Tracker", value: `${limits.rank_tracker}/day` },
    { label: "Search Tracker", value: `${limits.search_tracker}/day` },
    { label: "Maximum pins/search", value: String(limits.max_pins_per_search) },
    { label: "Stored projects", value: String(limits.stored_projects) },
    { label: "Active trackers", value: String(limits.active_trackers) },
    { label: "Tracker history", value: `${limits.tracker_history_days} days` },
  ];
}

export const plans: Plan[] = [
  {
    code: "creator",
    name: "Creator",
    monthlyPrice: "9.99",
    priceLabel: "$9.99",
    pitch: "Solo creators who research a few niches a day.",
    featured: false,
    rows: entitlementRows({
      keyword_expand: 20,
      annotation_explorer: 5,
      top_pins: 3,
      pin_stats: 5,
      account_explorer: 5,
      board_explorer: 5,
      research_project: 2,
      rank_tracker: 5,
      search_tracker: 5,
      max_pins_per_search: 100,
      stored_projects: 10,
      active_trackers: 5,
      tracker_history_days: 30,
    }),
  },
  {
    code: "professional",
    name: "Professional",
    monthlyPrice: "29.99",
    priceLabel: "$29.99",
    pitch: "Creators and teams who live in rank tracking.",
    featured: true,
    rows: entitlementRows({
      keyword_expand: 40,
      annotation_explorer: 15,
      top_pins: 10,
      pin_stats: 20,
      account_explorer: 15,
      board_explorer: 15,
      research_project: 5,
      rank_tracker: 25,
      search_tracker: 25,
      max_pins_per_search: 300,
      stored_projects: 50,
      active_trackers: 25,
      tracker_history_days: 90,
    }),
  },
  {
    code: "studio",
    name: "Studio",
    monthlyPrice: "85.99",
    priceLabel: "$85.99",
    pitch: "Agencies, publishers, and high-volume research teams.",
    featured: false,
    rows: entitlementRows({
      keyword_expand: 100,
      annotation_explorer: 50,
      top_pins: 25,
      pin_stats: 50,
      account_explorer: 50,
      board_explorer: 50,
      research_project: 10,
      rank_tracker: 75,
      search_tracker: 75,
      max_pins_per_search: 500,
      stored_projects: 200,
      active_trackers: 75,
      tracker_history_days: 365,
    }),
  },
];
