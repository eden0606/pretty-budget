'use client';

import Link from 'next/link';
import Book from '../svgs/Book';
import Chart from '../svgs/Chart';
import TableList from '../svgs/TableList';
import styles from './Nav.module.scss';

const Nav: React.FC = () => {
  const handleNav = () => {
    console.log('inside');
    const nav = document.getElementById('nav');
    const links = document.getElementById('nav-links');

    if (nav && links) {
      links.classList.toggle(styles.animateOut);
      nav.classList.toggle(styles.open);

      if (!links.classList.contains(styles.animateOut)) {
        links.classList.toggle(styles.flex);
        setTimeout(() => {}, 450);
      } else {
        links.classList.toggle(styles.flex);
      }
    }
  };

  return (
    <div className={styles.nav}>
      <div className={styles.circle} onClick={() => handleNav()}>
        <div id="nav" className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="nav-links" className={`${styles.links} ${styles.animateOut}`}>
        <Link href="/form">
          <TableList />
        </Link>
        <Link href="/entries">
          <Book />
        </Link>
        <Link href="/dashboard">
          <Chart />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
