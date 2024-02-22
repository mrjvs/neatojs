import approx from 'approximate-number';
import Link from 'next/link';
import { useGithubRepoStats } from '../hooks/use-github-repo-stats';
import { Icon } from './icon';

export interface GithubDisplayProps {
  org: string;
  repo: string;
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
      <div className="gd-flex-1 gd-text-sm">
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
