"use client";

import { useEffect, useMemo, useState } from "react";
import { ChartBar } from "@phosphor-icons/react";
import { SectionReveal } from "./section-reveal";
import { SpotlightText } from "./spotlight-text";

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface YearData {
  year: number;
  total: number;
  weeks: Day[][];
  monthLabels: { index: number; label: string }[];
}

interface ApiDay {
  date: string;
  contributionCount: number;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function processYear(flatDays: Day[]): YearData {
  if (flatDays.length === 0) {
    return { year: 0, total: 0, weeks: [], monthLabels: [] };
  }

  const sorted = [...flatDays].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const byDate = new Map<string, Day>();
  for (const d of sorted) byDate.set(d.date, d);

  const first = new Date(sorted[0].date);

  const start = new Date(first.getFullYear(), 0, 1);
  // Align start to Sunday
  const startDay = start.getDay();
  if (startDay > 0) start.setDate(start.getDate() - startDay);

  const end = new Date(first.getFullYear(), 11, 31);
  // Align end to Saturday
  const endDay = end.getDay();
  end.setDate(end.getDate() + (6 - endDay));

  const weeks: Day[][] = [];
  const monthLabels: { index: number; label: string }[] = [];
  const cursor = new Date(start);

  let weekIndex = 0;
  let currentMonth = "";
  while (cursor <= end) {
    const week: Day[] = [];

    for (let d = 0; d < 7; d++) {
      const key = cursor.toISOString().slice(0, 10);
      const found = byDate.get(key);

      const m = MONTHS[cursor.getMonth()];
      if (m !== currentMonth) {
        currentMonth = m;
        monthLabels.push({ index: weekIndex, label: m });
      }

      week.push(
        found ?? { date: key, count: 0, level: 0 as const }
      );

      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);
    weekIndex++;
  }

  const total = flatDays.reduce((s, d) => s + d.count, 0);

  return { year: first.getFullYear(), total, weeks, monthLabels };
}

function groupByYear(apiWeeks: ApiDay[][]): YearData[] {
  const flat: Day[] = apiWeeks.flat().map((raw) => ({
    date: raw.date,
    count: raw.contributionCount,
    level: getLevel(raw.contributionCount),
  }));

  const yearMap = new Map<number, Day[]>();
  for (const d of flat) {
    const y = Number(d.date.slice(0, 4));
    if (!yearMap.has(y)) yearMap.set(y, []);
    yearMap.get(y)!.push(d);
  }

  return Array.from(yearMap.entries())
    .map(([, days]) => processYear(days))
    .sort((a, b) => a.year - b.year);
}

const CELL_SIZE = 12;
const CELL_GAP = 3;
const CELL_RADIUS = 2;

function ContributionGrid({ yearData }: { yearData: YearData }) {
  const { weeks, monthLabels } = yearData;

  const maxMonthIndex = monthLabels.length > 0
    ? monthLabels[monthLabels.length - 1].index
    : 0;

  return (
    <div className="pb-1 flex justify-center">
      <div>
        <div className="flex" style={{ paddingLeft: 32, gap: CELL_GAP }}>
          <div className="flex" style={{ gap: CELL_GAP }}>
            {Array.from({ length: maxMonthIndex + 1 }, (_, wi) => {
              const label = monthLabels.find((m) => m.index === wi);
              return (
                <div
                  key={wi}
                  className="text-[10px] text-muted/50 font-mono"
                  style={{ width: CELL_SIZE, textAlign: "left" }}
                >
                  {label?.label ?? ""}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex mt-1">
          <div
            className="flex flex-col shrink-0"
            style={{ gap: CELL_GAP, width: 28, paddingRight: 4 }}
          >
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                className="text-[10px] text-muted/40 font-mono flex items-center"
                style={{ height: CELL_SIZE }}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="flex" style={{ gap: CELL_GAP }}>
            {weeks.map((week, wi) => (
              <div
                key={wi}
                className="flex flex-col"
                style={{ gap: CELL_GAP }}
              >
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={day.date ? `${day.date}: ${day.count} contributions` : ""}
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      borderRadius: CELL_RADIUS,
                      backgroundColor: day.level
                        ? `rgba(232, 93, 58, ${0.12 + day.level * 0.22})`
                        : "var(--color-stone-surface)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-4 text-[10px] text-muted/40 font-mono" style={{ paddingLeft: 32 }}>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  borderRadius: CELL_RADIUS,
                  backgroundColor: level
                    ? `rgba(232, 93, 58, ${0.12 + level * 0.22})`
                    : "var(--color-stone-surface)",
                }}
            />
          ))}
          <span>More</span>
        </div>
        </div>
    </div>
  );
}

export function GitGraph() {
  const [years, setYears] = useState<YearData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(
          "https://github-contributions-api.deno.dev/AtfastrSlushyMaker.json"
        );
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const apiWeeks: ApiDay[][] = data.contributions ?? [];
        setYears(groupByYear(apiWeeks));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  const displayedYear = selectedYear ?? years[years.length - 1]?.year;
  const yearData = useMemo(
    () => years.find((y) => y.year === displayedYear),
    [years, displayedYear]
  );

  if (loading) {
    return (
      <section id="activity" className="px-6 py-32 md:py-48 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <div>
            <p className="text-xs text-muted/60 tracking-wide mb-4">
              <ChartBar weight="duotone" className="w-3.5 h-3.5 inline-block mr-1.5 -mt-px" />
              Activity
            </p>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl tracking-tighter font-medium text-foreground mb-8">
              GitHub contributions.
            </h2>
            <div className="h-32 rounded-lg shimmer-bg" />
          </div>
        </div>
      </section>
    );
  }

  if (error) return null;

  return (
    <section id="activity" className="px-6 py-32 md:py-48 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
        <div>
          <p className="text-xs text-muted/60 tracking-wide mb-4">
              <ChartBar weight="duotone" className="w-3.5 h-3.5 inline-block mr-1.5 -mt-px" />
              Activity
            </p>
        </div>
          <div>
            <SectionReveal>
              <h2 className="text-3xl md:text-5xl tracking-tighter font-medium text-foreground mb-1">
                <SpotlightText className="text-foreground" radius={280}>
                  GitHub contributions.
                </SpotlightText>
              </h2>
              <p className="text-sm text-muted mb-8 font-mono tabular-nums">
                {years.reduce((s, y) => s + y.total, 0).toLocaleString()} contributions total
              </p>
            </SectionReveal>

          <div className="flex flex-wrap gap-2 mb-8">
            {years.map((y) => (
              <button
                key={y.year}
                onClick={() => setSelectedYear(y.year)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all font-mono ${
                  displayedYear === y.year
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-stone-border/50 text-muted hover:border-stone-muted"
                }`}
              >
                {y.year}
                <span className="ml-1.5 opacity-50">{y.total}</span>
              </button>
            ))}
          </div>

          {yearData && <ContributionGrid yearData={yearData} />}
        </div>
      </div>
    </section>
  );
}
