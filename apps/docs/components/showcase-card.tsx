import Link from 'next/link';
import classNames from 'classnames';
import type { ReactNode } from 'react';

export type ShowcaseTag = 'guider' | 'config';

export interface ShowcaseType {
  imageUrl: string;
  href: string;
  title: string;
  description: string;
  tags: ShowcaseTag[];
}

export function ShowcasePill(props: {
  children?: ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={classNames({
        'border-line border rounded-full py-1 px-6 capitalize cursor-pointer text-text bg-bgLightest bg-opacity-0':
          true,
        'hover:bg-opacity-100 hover:text-textHeading active:scale-105 transition-[border-color,transform,background-color]':
          true,
        '!text-textHeading !bg-opacity-100': props.active,
      })}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function ShowcaseCardContainer(props: {
  children?: ReactNode;
  selected: null | ShowcaseTag;
  onSelect: (tag: null | ShowcaseTag) => void;
}) {
  const tags: (null | ShowcaseTag)[] = [null, 'guider', 'config'];

  return (
    <div>
      <div className="hidden sm:flex border-b py-4 mb-8 space-x-2 border-line">
        <h1 className="text-xl font-bold flex-1 text-textHeading">Showcases</h1>
        {tags.map((t) => (
          <ShowcasePill
            key={t ?? 'null'}
            active={t === props.selected}
            onClick={() => {
              props.onSelect(t);
            }}
          >
            {t ?? 'All'}
          </ShowcasePill>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {props.children}
      </div>
    </div>
  );
}

export function ShowcaseCard(props: { showcase: ShowcaseType }) {
  return (
    <article className="border-line border p-4 rounded-2xl">
      <Link
        href={props.showcase.href}
        className="block hover:opacity-75 border-line border aspect-video w-full bg-bgLightest mb-6 rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${props.showcase.imageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
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
