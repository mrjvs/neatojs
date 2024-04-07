import type { ReactNode } from 'react';
import { Icon } from '@neato/guider/client';
import Link from 'next/link.js';

function Card(props: {
  children?: ReactNode;
  right?: ReactNode;
  icon: string;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 border p-6 border-line hover:border-text hover:border-opacity-50 rounded-xl transition-colors duration-100">
      <Icon icon={props.icon} className="text-2xl -mt-1 text-primary" />
      <div className="flex-1">{props.children}</div>
      <div className="items-center flex md:mt-0 mt-8">{props.right}</div>
    </div>
  );
}

function Title(props: { children?: ReactNode; href: string }) {
  return (
    <Link href={props.href}>
      <h1 className="text-lg hover:opacity-75 text-textHeading mb-2 font-bold inline-block">
        {props.children}
      </h1>
    </Link>
  );
}

function Description(props: { children?: ReactNode }) {
  return <p className="leading-normal max-w-xs">{props.children}</p>;
}

export function HomeCardContainer(props: { children?: ReactNode }) {
  return <div className="space-y-4">{props.children}</div>;
}

export const HomeCard = {
  Card,
  Title,
  Description,
};
