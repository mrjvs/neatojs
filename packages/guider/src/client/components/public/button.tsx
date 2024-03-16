import classNames from 'classnames';
import Link from 'next/link';
import type { ReactNode } from 'react';

export interface ButtonProps {
  to?: string;
  children?: ReactNode;
  className?: string;
  type?: 'primary' | 'secondary';
  onClick?: () => void;
}

const buttonStyles = {
  primary:
    'gd-from-primary gd-to-primaryDark gd-text-textHeading gd-border-primary hover:gd-from-primaryDark hover:gd-to-primaryDark',
  secondary:
    'gd-from-bgLight gd-to-bg gd-text-textLight hover:gd-text-textHeading gd-border-line hover:gd-from-bg hover:gd-to-bg',
};

export function Button(props: ButtonProps) {
  const classes = classNames(
    buttonStyles[props.type ?? 'primary'],
    'gd-bg-gradient-to-b gd-text-opacity-90 gd-px-4 gd-py-2 gd-rounded-md gd-border',
    'gd-transition-[background,transform]',
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
