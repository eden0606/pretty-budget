'use client';

import Link from 'next/link';
import Book from '../svgs/Book';
import Chart from '../svgs/Chart';
import TableList from '../svgs/TableList';
import styles from './Nav.module.scss';
import { useSearchParams } from 'next/navigation';
import { generateQueryString } from '@/lib/helpers';

const Nav: React.FC = () => {
  const searchParams = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParams.entries());
  const queryString = generateQueryString(searchParamsObj);

  const handleNav = () => {
    const nav = document.getElementById('nav');
    const links = document.getElementById('nav-links');

    if (nav && links) {
      nav.classList.toggle(styles.open);
      // TODO figure this out
      if (!links.classList.contains(styles.animateOut)) {
        links.classList.toggle(styles.animateOut);

        setTimeout(() => {
          links.classList.toggle(styles.flex);
        }, 200);
      } else {
        links.classList.toggle(styles.animateOut);
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
        <Link href={`/form${queryString}`}>
          <TableList />
        </Link>
        <Link href={`/entries${queryString}`}>
          <Book />
        </Link>
        <Link href={`/dashboard${queryString}`}>
          <Chart />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
