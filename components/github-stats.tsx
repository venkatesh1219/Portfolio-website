import { Github, Star, GitFork, Users, BookMarked } from "lucide-react";
import { siteConfig } from "@/lib/site";

type GitHubData = {
  followers: number;
  publicRepos: number;
  stars: number;
  forks: number;
};

/**
 * Server-side fetch of public GitHub stats with ISR caching.
 * Falls back to representative numbers if the API is unavailable
 * (e.g. rate-limited at build time) so the UI never breaks.
 */
async function getGitHubStats(): Promise<GitHubData> {
  // Used only if the GitHub API is unreachable (e.g. rate-limited at build).
  const fallback: GitHubData = {
    followers: 3,
    publicRepos: 8,
    stars: 0,
    forks: 0,
  };

  const username = siteConfig.githubUsername;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return fallback;

    const user = await userRes.json();
    const repos: Array<{ stargazers_count: number; forks_count: number }> =
      await reposRes.json();

    const stars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const forks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

    // A successful fetch returns real values — including a legitimate 0.
    return {
      followers: user.followers ?? fallback.followers,
      publicRepos: user.public_repos ?? fallback.publicRepos,
      stars,
      forks,
    };
  } catch {
    return fallback;
  }
}

function compact(n: number) {
  return Intl.NumberFormat("en", { notation: "compact" }).format(n);
}

export async function GitHubStats() {
  const data = await getGitHubStats();
  const items = [
    { icon: Star, label: "Stars", value: compact(data.stars) },
    { icon: GitFork, label: "Forks", value: compact(data.forks) },
    { icon: BookMarked, label: "Repos", value: compact(data.publicRepos) },
    { icon: Users, label: "Followers", value: compact(data.followers) },
  ];

  return (
    <div className="glass rounded-xl p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Github className="h-4 w-4" />
        <span>GitHub activity</span>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-primary hover:underline"
        >
          @{siteConfig.githubUsername}
        </a>
      </div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-background/40 p-3"
          >
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </dt>
            <dd className="mt-1 text-xl font-bold tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
