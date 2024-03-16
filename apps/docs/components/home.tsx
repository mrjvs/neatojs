import type { ReactNode } from 'react';
import styles from './home.module.css';

function Container(props: { children?: ReactNode }) {
  return <div className={styles.home}>{props.children}</div>;
}

function Title(props: { children?: ReactNode }) {
  return <h1 className={styles.title}>{props.children}</h1>;
}

function Subtitle(props: { children?: ReactNode }) {
  return <p className={styles.subtitle}>{props.children}</p>;
}

export const Home = {
  Container,
  Title,
  Subtitle,
};
