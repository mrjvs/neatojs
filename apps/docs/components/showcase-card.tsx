import Link from 'next/link';
import type { ReactNode } from 'react';

export type ShowcaseTag = 'guider' | 'config';

export interface Showcase {
  imageUrl: string;
  href: string;
  title: string;
  description: string;
  tags: ShowcaseTag[];
}

export function ShowcaseCardContainer(props: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {props.children}
    </div>
  );
}

export function ShowcaseCard(props: { showcase: Showcase }) {
  return (
    <article className="border-line border p-4 rounded-2xl">
      <Link
        href={props.showcase.href}
        className="block hover:opacity-75 aspect-video w-full bg-bgLightest mb-6 rounded-xl overflow-hidden"
      >
        <img
          src={props.showcase.imageUrl}
          alt={props.showcase.title}
          className="object-cover object-center"
        />
      </Link>
      <Link href={props.showcase.href}>
        <h1 className="text-lg hover:text-primary font-bold mb-1 text-textHeading">
          {props.showcase.title}
        </h1>
      </Link>
      <p className="text-text text-normal text-sm">
        {props.showcase.description}
      </p>
    </article>
  );
}
