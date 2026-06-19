import { Github, Star, GitFork, ExternalLink, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  HCL: "#844FBA",
  Java: "#b07219",
};

// Honest fallback (real repos) so the section renders even if the API is rate-limited.
// Repos to hide from the live grid (by lowercased name).
const EXCLUDE = new Set(["portfolio-website", "ai-newsletter"]);

// Honest fallback (real repos) so the section renders even if the API is rate-limited.
const FALLBACK: Repo[] = [
  { name: "aws-landing-zone-terraform", description: "Multi-account AWS landing zone with Terraform — TGW networking, central CloudTrail, SCP guardrails.", html_url: "https://github.com/venkatesh1219/aws-landing-zone-terraform", homepage: null, language: "HCL", fork: false, archived: false, stargazers_count: 0, forks_count: 0, pushed_at: "2026-06-19" },
  { name: "eks-microservices-platform", description: "Production EKS platform — Terraform, reusable Helm chart, ArgoCD GitOps, HPA, blue-green.", html_url: "https://github.com/venkatesh1219/eks-microservices-platform", homepage: null, language: "HCL", fork: false, archived: false, stargazers_count: 0, forks_count: 0, pushed_at: "2026-06-19" },
  { name: "gitops-cicd-platform", description: "GitOps + CI/CD with SonarCloud/Snyk gates and ArgoCD ApplicationSet promotion.", html_url: "https://github.com/venkatesh1219/gitops-cicd-platform", homepage: null, language: "Shell", fork: false, archived: false, stargazers_count: 0, forks_count: 0, pushed_at: "2026-06-19" },
  { name: "observability-stack", description: "Prometheus SLO rules, Alertmanager → PagerDuty/Slack, Loki, Grafana, runbooks.", html_url: "https://github.com/venkatesh1219/observability-stack", homepage: null, language: "Shell", fork: false, archived: false, stargazers_count: 0, forks_count: 0, pushed_at: "2026-06-19" },
  { name: "aws-cost-optimization", description: "FinOps toolkit — rightsizing & idle-resource reports, scheduler Lambda, budgets.", html_url: "https://github.com/venkatesh1219/aws-cost-optimization", homepage: null, language: "Python", fork: false, archived: false, stargazers_count: 0, forks_count: 0, pushed_at: "2026-06-19" },
  { name: "Docker-Jenkins-django", description: "DevOps pipeline: build a Docker image and push to Docker Hub via Jenkins.", html_url: "https://github.com/venkatesh1219/Docker-Jenkins-django", homepage: null, language: "JavaScript", fork: false, archived: false, stargazers_count: 0, forks_count: 0, pushed_at: "2026-03-01" },
];

async function getRepos(): Promise<Repo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=100&sort=pushed`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return FALLBACK;
    const repos: Repo[] = await res.json();
    const filtered = repos.filter(
      (r) => !r.archived && !EXCLUDE.has(r.name.toLowerCase())
    );
    if (!filtered.length) return FALLBACK;
    // Originals first, then forks; each group most-recently-pushed first.
    return filtered
      .sort((a, b) => {
        if (a.fork !== b.fork) return a.fork ? 1 : -1;
        return +new Date(b.pushed_at) - +new Date(a.pushed_at);
      })
      .slice(0, 9);
  } catch {
    return FALLBACK;
  }
}

export async function GitHubProjects() {
  const repos = await getRepos();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <a
          key={repo.name}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-full flex-col rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/40"
        >
          <div className="flex items-center justify-between">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-foreground">
              <Github className="h-4 w-4" />
            </span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {repo.fork && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5">
                  <GitFork className="h-3 w-3" />
                  Fork
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {repo.stargazers_count}
                </span>
              )}
            </div>
          </div>

          <h3 className="mt-4 break-words font-semibold tracking-tight transition-colors group-hover:text-primary">
            {repo.name}
          </h3>
          <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {repo.description || "No description provided."}
          </p>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            {repo.language ? (
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: LANG_COLORS[repo.language] ?? "#8b949e" }}
                />
                {repo.language}
              </span>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-2">
              {repo.homepage && (
                <span className="inline-flex items-center gap-1 text-primary">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live
                </span>
              )}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
