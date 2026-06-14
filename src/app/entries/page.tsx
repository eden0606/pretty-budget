import Entry from '@/components/Entry';
import { FormData } from '@/types';
import styles from './page.module.scss';
import { isAuthenticated } from '@/lib/helpers';
import { getLocalTimezoneDateServer } from '../dashboard/page';
import Search from '@/components/svgs/Search';

export const dynamic = 'force-dynamic';

export default async function Entries() {
  //   const router = useRouter();
  // TODO: add auth state
  // if (isAuthenticated) {
  let data: FormData[] = [];

  try {
    let response;
    response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/expenses`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });

    data = await response.json();
  } catch (err) {
    console.error('API call failed:', err);
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>entries</h1>
        <button className={styles.search}>
          <Search />
        </button>
      </div>
      <div className={styles.entries}>
        {data?.map(async (item, index) => {
          const isFlagged = !!item?.flag;
          const borderColor = isFlagged ? 'var(--primary)' : 'transparent';
          const date = new Date(item.date);
          const localDate = await getLocalTimezoneDateServer(date);

          return (
            <div key={item.id} className={styles.entry}>
              <Entry
                data={{ ...(item as FormData), date: localDate.toISOString() }}
                style={{ border: `3px dotted ${borderColor}` }}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
