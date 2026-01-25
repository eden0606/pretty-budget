import { cookies } from 'next/headers';
import styles from './page.module.scss';
import ColorChip from '@/components/ColorChip';
import { Themes } from '../layout';
import { Fragment } from 'react/jsx-runtime';

export default async function Settings() {
  // TODO: add auth state
  // if (isAuthenticated) {
  const cookieStore = await cookies();
  const themes: { hex: string; label: Themes }[] = [
    {
      hex: '#133d05',
      label: 'green'
    },
    {
      hex: '#a7abde',
      label: 'purple'
    }
  ];
  console.log('settings cookie retrieval', cookieStore.get('theme'));
  const currentTheme = cookieStore.get('theme') || 'green';

  return (
    <main className={styles.page}>
      <h1>settings</h1>
      {/* TODO: store these settings in local storage + cookies */}
      <div className={styles.chips}>
        {themes.map((theme, index) => (
          <Fragment key={`${theme}-${index}`}>
            <ColorChip {...theme} currentTheme={currentTheme as Themes} />
          </Fragment>
        ))}
      </div>
    </main>
  );
}
