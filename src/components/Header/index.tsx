import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.container} ${styles.wrapper}`}>
        <Link
          href="/"
          className={styles.logo}
        >
          <Image
            src={require('../../assets/image/logo.svg')}
            alt="My Pet Online"
          />
        </Link>
      </nav>
    </header>
  );
}
