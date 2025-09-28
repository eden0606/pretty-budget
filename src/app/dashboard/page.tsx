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
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = formatFullDate(date);
  let data: { [key: string]: any }[] = [];

  try {
    let response;
    response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/expenses?filter=month&day=${day}&month=${month}&year=${year}&action=sum_total_amount`,
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
  const yearlySpend =
    data.find((data) => data.category === 'yearly_spend')?.total.toFixed(2) || '0';
  const monthlySpend =
    data.find((data) => data.category === 'monthly_spend')?.total.toFixed(2) || '0';
  const dailySpend = data.find((data) => data.category === 'daily_spend')?.total.toFixed(2) || '0';

  return (
    <main className={styles.page}>
      <div>
        <h1>dashboard</h1>
        <h2>{fullDate}</h2>
      </div>
      <div>
        <h3>daily spend</h3>
        <p>${dailySpend}</p>
      </div>
      <div>
        <h3>monthly spend</h3>
        <p>${monthlySpend}</p>
      </div>
      <div>
        <h3>yearly spend</h3>
        <p>${yearlySpend}</p>
      </div>
      <div>
        <h3>total monthly spend by category</h3>
        {data.map((data, index) => {
          if (
            data.category !== 'yearly_spend' &&
            data.category !== 'monthly_spend' &&
            data.category !== 'daily_spend'
          ) {
            return (
              <div key={`${data.category}-${index}`}>
                <p>
                  {data.category}: ${data.total}
                </p>
              </div>
            );
          }
        })}
      </div>

      {/* <button className={styles.refresh} onClick={() => router.reload()}> */}
      {/* TODO: add refresh functionality + add animation */}
      {/* <Refresh /> */}
      {/* </button> */}
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
