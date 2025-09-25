import Entry from '@/components/Entry';
import { FormData } from '@/types';
import Refresh from '@/components/svgs/Refresh';
// import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { formatFullDate, isAuthenticated } from '@/lib/helpers';

export const dynamic = 'force-dynamic';

export default async function Entries() {
  //   const router = useRouter();
  // TODO: add auth state
  // if (isAuthenticated) {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = formatFullDate(date);
  let data: { [key: string]: any }[] = [];

  try {
    let response;
    response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/expenses?filter=month&month=${month}&year=${year}&action=sum_total_amount`,
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
  const yearlySpend = data.find((data) => data.category === 'yearly_spend')?.total || '0';
  const monthlySpend = data.find((data) => data.category === 'monthly_spend')?.total || '0';
  const dailySpend = data.find((data) => data.category === 'daily_spend')?.total || '0';

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>dashboard</h1>
        <h2>{fullDate}</h2>
        <h2>daily spend:</h2>
        <h3>${dailySpend}</h3>
        <h2>monthly spend:</h2>
        <h3>${monthlySpend}</h3>
        <h2>yearly spend:</h2>
        <h3>${yearlySpend}</h3>
        <h2>total monthly spend by category</h2>
        {data.map((data, index) => {
          if (
            data.category !== 'yearly_spend' &&
            data.category !== 'monthly_spend' &&
            data.category !== 'daily_spend'
          ) {
            return (
              <div key={`${data.category}-${index}`}>
                <h3>
                  {data.category}: ${data.total}
                </h3>
              </div>
            );
          }
        })}
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
