import { useEffect, useState } from 'react';

export interface GithubRepoStats {
  stars: number;
  forks: number;
  name: string;
}

const globalRepoCache: Record<string, GithubRepoStats> = {};

export function useGithubRepoStats(org: string, repo: string) {
  const url = `${org}/${repo}`;
  const [stats, setStats] = useState<null | GithubRepoStats>(
    globalRepoCache[url] ?? null,
  );

  useEffect(() => {
    void (async () => {
      if (globalRepoCache[url]) {
        setStats(globalRepoCache[url]);
        return;
      }
      const data = await fetch(`https://api.github.com/repos/${url}`);
      const jsonData = await data.json();
      const newStats: GithubRepoStats = {
        forks: jsonData.forks_count,
        stars: jsonData.stargazers_count,
        name: jsonData.full_name,
      };
      globalRepoCache[url] = newStats;
      setStats(newStats);
    })();
  }, [url]);

  return {
    stats,
    name: stats ? stats.name : `${org}/${repo}`,
  };
}
