"use client";
import { UiIcon } from "./ui-icon";


import { useEffect, useMemo, useState } from "react";

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

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

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

  const start = new Date(Date.UTC(first.getUTCFullYear(), 0, 1));
  // Align start to Sunday
  const startDay = start.getUTCDay();
  if (startDay > 0) start.setUTCDate(start.getUTCDate() - startDay);

  const end = new Date(Date.UTC(first.getUTCFullYear(), 11, 31));
  // Align end to Saturday
  const endDay = end.getUTCDay();
  end.setUTCDate(end.getUTCDate() + (6 - endDay));

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

      const m = MONTHS[cursor.getUTCMonth()];
      if (m !== currentMonth && cursor.getUTCFullYear() === first.getUTCFullYear()) {
        currentMonth = m;
        monthLabels.push({ index: weekIndex, label: m });
      }

      week.push(
        found ?? { date: key, count: 0, level: 0 as const }
      );

      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    weeks.push(week);
    weekIndex++;
  }

  const total = flatDays.reduce((s, d) => s + d.count, 0);

  return { year: first.getUTCFullYear(), total, weeks, monthLabels };
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

const levelColor = (level: number) => level
  ? `color-mix(in srgb, var(--color-accent-slate) ${20 + level * 20}%, var(--color-stone-surface))`
  : "var(--color-stone-surface)";

/**
 * One year of contributions as a CSS grid that always fits its container: a column per week, square cells,
 * and month labels placed on the exact week column where each month starts.
 */
function ContributionGrid({ yearData }: { yearData: YearData }) {
  const { weeks, monthLabels } = yearData;
  const columns = `2.2rem repeat(${weeks.length}, minmax(0, 1fr))`;

  return (
    <div className="contrib">
      <div className="contrib-grid" style={{ gridTemplateColumns: columns }}>
        {monthLabels.map(m => (
          <span key={m.label} className="contrib-month" style={{ gridColumn: m.index + 2, gridRow: 1 }}>{m.label}</span>
        ))}
        {DAY_LABELS.map((label, i) => (
          <span key={i} className="contrib-day" style={{ gridColumn: 1, gridRow: i + 2 }}>{label}</span>
        ))}
        {weeks.map((week, wi) => week.map((day, di) => (
          <span
            key={day.date}
            className="contrib-cell"
            title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
            style={{ gridColumn: wi + 2, gridRow: di + 2, backgroundColor: levelColor(day.level) }}
          />
        )))}
      </div>
      <div className="contrib-legend" aria-hidden="true">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map(level => <span key={level} className="contrib-cell" style={{ backgroundColor: levelColor(level) }} />)}
        <span>More</span>
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
        const res = await fetch("/api/contributions");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
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


  return (
    <section id="activity" className="activity-section page-section" aria-labelledby="activity-title">
      <div className="activity-heading">
        <h2 id="activity-title">GitHub activity</h2>
        <a href="https://github.com/AtfastrSlushyMaker" target="_blank" rel="noopener noreferrer">View GitHub profile <UiIcon name="outward" /></a>
      </div>
      {loading ? <p className="activity-status" role="status">Loading contribution history…</p> : error || years.length === 0 ?
        <p className="activity-status">The contribution calendar is unavailable. The work is on GitHub.</p> : <>
          <div className="activity-controls"><p>{years.reduce((sum,year) => sum + year.total,0).toLocaleString()} contributions across {years.length} years</p>
            <div role="group" aria-label="Contribution year">{years.map(year => <button key={year.year} onClick={() => setSelectedYear(year.year)} aria-pressed={displayedYear === year.year}>{year.year}</button>)}</div>
          </div>
          {yearData && <ContributionGrid yearData={yearData} />}
        </>}
    </section>
  );
}
