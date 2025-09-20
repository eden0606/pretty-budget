import Entry from '@/components/Entry';
import { FormData } from '@/types';
import Refresh from '@/components/svgs/Refresh';
// import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { isAuthenticated } from '@/lib/helpers';

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
        {/* <button className={styles.refresh} onClick={() => router.reload()}> */}
        {/* TODO: add refresh functionality + add animation */}
        {/* <Refresh /> */}
        {/* </button> */}
      </div>
      <div className={styles.entries}>
        {data.map((item) => {
          const hasNotes = !!item?.notes;
          return (
            <div key={item.id} className={styles.entry}>
              <Entry
                data={item as FormData}
                style={hasNotes ? { border: '3px dotted var(--dark-periwinkle)' } : {}}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
