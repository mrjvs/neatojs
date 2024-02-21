import { useEffect, useState } from 'react';
import approx from 'approximate-number';
import Link from 'next/link';
import { Icon } from './icon';

export interface GithubDisplayProps {
  org: string;
  repo: string;
}

export interface GithubRepoStats {
  stars: number;
  forks: number;
  name: string;
}

const globalRepoCache: Record<string, GithubRepoStats> = {};

export function useGithubRepoStats(org: string, repo: string) {
  const [stats, setStats] = useState<null | GithubRepoStats>(null);

  useEffect(() => {
    void (async () => {
      const url = `${org}/${repo}`;
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
  }, [org, repo]);

  return {
    stats,
    name: stats ? stats.name : `${org}/${repo}`,
  };
}

export function GithubDisplay(props: GithubDisplayProps) {
  const { stats, name } = useGithubRepoStats(props.org, props.repo);

  return (
    <Link
      href={`https://github.com/${props.org}/${props.repo}`}
      target="_blank"
      className="gd-flex gd-py-2 gd-px-4 -gd-my-2 gd-rounded-lg gd-items-center gd-bg-opacity-0 hover:gd-bg-opacity-100 gd-bg-bgLight gd-duration-75 gd-transition-[background-color,transform] active:gd-scale-105"
    >
      <Icon
        icon="fab:github"
        className="gd-mr-3 gd-text-xl gd-text-textHeading"
      />
      <div className="gd-flex-1">
        <p className="gd-text-textHeading">{name}</p>
        <p className="gd-flex gd-items-center gd-gap-4">
          <span className="gd-space-x-1">
            <Icon icon="far:star" />
            <span>{stats ? approx(stats.stars) : null}</span>
          </span>
          <span className="gd-space-x-1">
            <Icon icon="fa:code-branch" />
            <span>{stats ? approx(stats.forks) : null}</span>
          </span>
        </p>
      </div>
    </Link>
  );
}
