import Link from 'next/link.js';
import styles from './logo.module.css';

export function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <img src="/logo.svg" /> NeatoJS
    </Link>
  );
}
