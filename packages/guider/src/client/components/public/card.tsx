import type { ReactNode } from 'react';
import { Icon } from '../icon';

export type CardProps = {
  icon?: string;
  title: string;
  children?: ReactNode;
};

export function Card(props: CardProps) {
  return (
    <div className="gd-bg-bgLight gd-border hover:gd-border-primaryDark gd-transition-colors gd-duration-100 gd-border-line gd-rounded-xl gd-p-6 gd-pt-8">
      {props.icon ? (
        <Icon icon={props.icon} className="gd-text-[2rem] gd-text-primary" />
      ) : null}
      <h2 className="gd-text-[20px] gd-my-2 gd-text-white gd-font-bold">
        {props.title}
      </h2>
      {props.children}
    </div>
  );
}

export function CardGrid(props: { children?: ReactNode }) {
  return (
    <div className="gd-grid gd-grid-cols-1 lg:gd-grid-cols-3 md:gd-mx-16 gd-my-6 gd-gap-6">
      {props.children}
    </div>
  );
}
