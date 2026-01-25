import Entry from '@/components/Entry';
import { FormData } from '@/types';
import Refresh from '@/components/svgs/Refresh';
// import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { formatFullDate, isAuthenticated } from '@/lib/helpers';
import { CATEGORY_SVGS, MONTHS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
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
      `${process.env.NEXT_PUBLIC_APP_URL}/api/expenses?day=${day}&month=${month}&year=${year}&action=sum_total_amount`,
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

  const yearlySpend =
    data.find((data) => data.category === 'yearly_spend')?.total?.toFixed(2) || '0';
  const monthlySpend =
    data.find((data) => data.category === 'monthly_spend')?.total?.toFixed(2) || '0';
  const dailySpend = data.find((data) => data.category === 'daily_spend')?.total?.toFixed(2) || '0';

  return (
    <main className={styles.page}>
      <h1>dashboard</h1>
      <div className={styles.spend}>
        <div>
          <h2>{fullDate}</h2>
          <p>${dailySpend}</p>
        </div>
        <div>
          <h3>monthly</h3>
          <p>${monthlySpend}</p>
        </div>
        <div>
          <h3>yearly</h3>
          <p>${yearlySpend}</p>
        </div>
      </div>
      {/* <p className={styles.border}>.。･:*:･°˖✧◝(◕ヮ◕)◜✧˖°･:*:･。.</p> */}
      <div>
        {/* TODO: extract this to its own client component */}
        <div className={styles.viewSpendInput}>
          <label htmlFor="displays">view spend . . . </label>
          <select name="displays" id="displays">
            <option value="category">by category</option>
            <option value="vs_last_month">vs. last month</option>
            <option value="ytd">over the last year</option>
            <option value="wants_vs_needs">wants vs. needs</option>
          </select>
        </div>
        <div className={styles.categorySpend}>
          {data.map((data, index) => {
            if (
              data.category !== 'yearly_spend' &&
              data.category !== 'monthly_spend' &&
              data.category !== 'daily_spend'
            ) {
              return (
                <div key={`${data.category}-${index}`} className={styles.category}>
                  {CATEGORY_SVGS[data.category]}
                  <p>${data.total.toFixed(2)}</p>
                  {/* TODO: potentially add toggle here to show labels? feels too messy outright */}
                  <p>{data.category}</p>
                </div>
              );
            }
          })}
        </div>
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
