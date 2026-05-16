const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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

async function fetchYear(from: string, to: string) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username: "AtfastrSlushyMaker", from, to },
    }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);

  return json.data?.user?.contributionsCollection?.contributionCalendar;
}

export async function GET() {
  if (!GITHUB_TOKEN) {
    return Response.json({ error: "Not configured" }, { status: 500 });
  }

  try {
    const years = [2022, 2023, 2024, 2025, 2026];
    const allWeeks: GithubDay[][] = [];
    let grandTotal = 0;

    for (const year of years) {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;
      const calendar = await fetchYear(from, to);

      if (!calendar) continue;

      grandTotal += calendar.totalContributions ?? 0;
      allWeeks.push(
        ...calendar.weeks.map((w: GithubWeek) => w.contributionDays)
      );
    }

    return Response.json({
      contributions: allWeeks,
      totalContributions: grandTotal,
    });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Failed" },
      { status: 500 }
    );
  }
}
