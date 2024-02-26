import classNames from 'classnames';
import Link from 'next/link';
import type { ReactNode } from 'react';

export interface ButtonProps {
  to?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  const classes = classNames(
    'gd-bg-gradient-to-b gd-from-primary gd-to-primaryDark gd-px-4 gd-py-2 gd-text-textHeading gd-rounded-md gd-border gd-border-primary',
    'hover:gd-from-primaryDark hover:gd-to-primaryDark hover:gd-text-opacity-100 gd-transition-[background-color,transform]',
    'active:gd-scale-105',
    props.className,
  );

  if (props.to)
    return (
      <Link href={props.to} className={classes}>
        {props.children}
      </Link>
    );
  return (
    <button className={classes} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
