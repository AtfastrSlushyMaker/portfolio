const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = "AtfastrSlushyMaker";
const FIRST_YEAR = 2022;
const REVALIDATE_SECONDS = 3600;

const query = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

interface GithubDay {
  date: string;
  contributionCount: number;
}

interface GithubWeek {
  contributionDays: GithubDay[];
}

/** Authenticated GraphQL API: exact counts, used when GITHUB_TOKEN is configured. */
async function fetchYearGraphql(year: number): Promise<GithubDay[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username: USERNAME, from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` },
    }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  return calendar ? calendar.weeks.flatMap((w: GithubWeek) => w.contributionDays) : [];
}

/** Public profile calendar: no token needed, so local development and token-less deploys still work. */
async function fetchYearPublic(year: number): Promise<GithubDay[]> {
  const res = await fetch(`https://github.com/users/${USERNAME}/contributions?from=${year}-01-01&to=${year}-12-31`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  const html = await res.text();

  const dates = new Map<string, string>();
  for (const [, tag] of html.matchAll(/<td\b([^>]*\bdata-date="[^"]+"[^>]*)>/g)) {
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    const date = tag.match(/\bdata-date="([^"]+)"/)?.[1];
    if (id && date) dates.set(id, date);
  }

  const days: GithubDay[] = [];
  for (const [, id, label] of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const date = dates.get(id);
    if (!date) continue;
    const count = Number(label.match(/^([\d,]+) contribution/)?.[1]?.replace(/,/g, "") ?? 0);
    days.push({ date, contributionCount: count });
  }
  return days;
}

export async function GET() {
  const years = Array.from({ length: new Date().getUTCFullYear() - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i);
  const fetchYear = GITHUB_TOKEN ? fetchYearGraphql : fetchYearPublic;

  try {
    const perYear = await Promise.all(years.map(fetchYear));
    const days = perYear.flat();
    return Response.json(
      {
        // The client regroups days by year, so one flat "week" per year is enough.
        contributions: perYear,
        totalContributions: days.reduce((sum, d) => sum + d.contributionCount, 0),
      },
      { headers: { "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400` } },
    );
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 502 });
  }
}
