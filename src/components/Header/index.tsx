import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.container} ${styles.wrapper}`}>
        <Link
          href="/"
          className={styles.logo}
        >
          My Pet Online
        </Link>
      </nav>
    </header>
  );
}
