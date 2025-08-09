import Entry from '@/components/Entry';
import { getData } from '@/lib/helpers';
import { FormData } from '@/types';
import Refresh from '@/components/svgs/Refresh';
// import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default async function Entries() {
  const data = await getData('DESC');
  //   const router = useRouter();

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
          return (
            <div key={item.id} className={styles.entry}>
              <Entry data={item as FormData} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
