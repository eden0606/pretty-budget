'use client';

import type { Themes } from '@/app/layout';
import styles from './ColorChip.module.scss';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';

interface ColorSelectProps {
  label: Themes;
  hex: string;
  currentTheme: Themes;
}

const ColorChip: React.FC<ColorSelectProps> = ({ label, hex, currentTheme }) => {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    const themeAttr = document.getElementById('theme')?.getAttribute('data-theme');
    setTheme(themeAttr as Themes);
  }, []);

  // useEffect(() => {
  //   Cookie.set('theme', label, { expires: 400 });
  //   document.getElementById('theme')?.setAttribute('data-theme', label);
  // }, [theme]);

  function changeTheme(label: Themes) {
    console.log('changing theme to ', label);
    Cookie.set('theme', label, { expires: 400 });
    document.getElementById('theme')?.setAttribute('data-theme', label);
    setTheme(label);
  }

  const isSelected = theme === label;
  console.log('isSelected', isSelected, currentTheme);
  return (
    <button
      className={`${styles.chip} ${isSelected && styles.selected}`}
      onClick={() => changeTheme(label)}
    >
      <div className={styles.palette} style={{ backgroundColor: hex }}></div>
      <p>{label}</p>
    </button>
  );
};

export default ColorChip;
