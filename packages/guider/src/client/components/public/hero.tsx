import Link from 'next/link.js';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import { Icon } from '../icon';

function Title(props: { children: React.ReactNode }) {
  return (
    <h1 className="gd-max-w-[476px] gd-text-2xl gd-text-center gd-font-bold gd-text-white">
      {props.children}
    </h1>
  );
}

function Subtitle(props: { children: React.ReactNode }) {
  return (
    <h1 className="gd-max-w-[476px] gd-mt-4 gd-text-[1.125rem] gd-text-center">
      {props.children}
    </h1>
  );
}

function Badge(props: {
  title: string;
  children: React.ReactNode;
  to?: string;
}) {
  const content = (
    <div
      className={classNames(
        'gd-bg-primaryDark gd-text-xs gd-bg-opacity-15 gd-py-1 gd-px-4 gd-text-primaryLight gd-text-opacity-75 gd-rounded-full gd-text-center gd-flex gd-items-center gd-gap-3 gd-mb-3',
        props.to
          ? 'hover:gd-bg-opacity-25 gd-transition-[background-color,transform] active:gd-scale-105'
          : undefined,
      )}
    >
      <span className="gd-text-primaryLight gd-text-opacity-100 gd-font-bold">
        {props.title}
      </span>{' '}
      {props.children}
      {props.to ? (
        <Icon
          className="gd-inline-block gd-font-bold gd-text-[1rem] gd-translate-x-2"
          icon="lucide:chevron-right"
        />
      ) : null}
    </div>
  );

  if (props.to) return <Link href={props.to}>{content}</Link>;
  return <div>{content}</div>;
}

function Actions(props: { children: React.ReactNode }) {
  return (
    <div className="gd-mt-12 gd-w-full gd-gap-5 gd-flex gd-flex-col sm:gd-justify-center sm:gd-flex-row">
      {props.children}
    </div>
  );
}

function HeroFunc(props: { children: React.ReactNode }) {
  return (
    <div className="gd-flex gd-my-24 gd-mb-36 gd-flex-col gd-w-full gd-items-center">
      {props.children}
    </div>
  );
}

export type HeroBuilder = {
  (props: { children: React.ReactNode }): ReactNode;
  Title: (props: { children: React.ReactNode }) => ReactNode;
  Subtitle: (props: { children: React.ReactNode }) => ReactNode;
  Actions: (props: { children: React.ReactNode }) => ReactNode;
  Badge: (props: {
    title: string;
    children: React.ReactNode;
    to?: string;
  }) => ReactNode;
};

export const Hero = HeroFunc as HeroBuilder;
Hero.Actions = Actions;
Hero.Subtitle = Subtitle;
Hero.Badge = Badge;
Hero.Title = Title;
