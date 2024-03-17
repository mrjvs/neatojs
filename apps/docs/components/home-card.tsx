import type { ReactNode } from 'react';
import { Icon } from '@neato/guider/client';
import Link from 'next/link.js';
import styles from './home-card.module.css';

function Card(props: {
  children?: ReactNode;
  right?: ReactNode;
  icon: string;
}) {
  return (
    <div className={styles.card}>
      <Icon icon={props.icon} className={styles.icon} />
      <div className={styles.body}>{props.children}</div>
      <div className={styles.right}>{props.right}</div>
    </div>
  );
}

function Title(props: { children?: ReactNode; href: string }) {
  return (
    <Link href={props.href}>
      <h1 className={styles.title}>{props.children}</h1>
    </Link>
  );
}

function Description(props: { children?: ReactNode }) {
  return <p className={styles.desc}>{props.children}</p>;
}

export function HomeCardContainer(props: { children?: ReactNode }) {
  return <div className={styles.container}>{props.children}</div>;
}

export const HomeCard = {
  Card,
  Title,
  Description,
};
