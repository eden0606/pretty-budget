import Entry from '@/components/Entry';
import { FormData } from '@/types';
import Refresh from '@/components/svgs/Refresh';
// import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { formatFullDate, getTotalCost, isAuthenticated } from '@/lib/helpers';

// export const dynamic = 'force-dynamic';

export default async function Entries() {
  //   const router = useRouter();
  // TODO: add auth state
  // if (isAuthenticated) {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const fullDate = formatFullDate(date);
  let data: FormData[] = [];

  try {
    let response;
    response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/expenses?filter=month&month=${month}&year=${year}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
      }
    );

    data = await response.json();
  } catch (err) {
    console.error('API call failed:', err);
  }

  console.log('DATA', data);

  const totalMonthlySpend = getTotalCost(data);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>dashboard</h1>
        <h2>{fullDate}</h2>
        <h2>total monthly spend: ${totalMonthlySpend}</h2>
        {/* <button className={styles.refresh} onClick={() => router.reload()}> */}
        {/* TODO: add refresh functionality + add animation */}
        {/* <Refresh /> */}
        {/* </button> */}
      </div>
      {/* <div className={styles.entries}>
        {data.map((item) => {
          return (
            <div key={item.id} className={styles.entry}>
              <Entry data={item as FormData} />
            </div>
          );
        })}
      </div> */}
    </main>
  );
}
