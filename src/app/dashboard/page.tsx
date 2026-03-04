import Entry from '@/components/Entry';
import { FormData } from '@/types';
import Refresh from '@/components/svgs/Refresh';
// import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { formatFullDate, getStatementDates, isAuthenticated } from '@/lib/helpers';
import { CATEGORY_SVGS, MONTHS } from '@/lib/constants';
import { ReactEventHandler } from 'react';
import DashboardDisplay from '@/components/DashboardDisplays/DashboardDisplay/DashboardDisplay';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function getLocalTimezoneDateServer(targetDate?: Date) {
  const header = await headers();
  const timezone = header.get('x-timezone') || 'America/New_York';
  const date = targetDate || new Date();

  return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
}

export default async function Dashboard() {
  //   const router = useRouter();
  // TODO: add auth state
  // if (isAuthenticated) {

  const date = await getLocalTimezoneDateServer();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = formatFullDate(date);
  const { startDate, endDate } = getStatementDates();

  let data: { [key: string]: any }[] = [];

  try {
    let response;
    response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/expenses?day=${day}&month=${month}&year=${year}&action=sum_total_amount&startDate=${startDate}&endDate=${endDate}`,
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
      <DashboardDisplay data={data} />

      {/* <button className={styles.refresh} onClick={() => router.reload()}> */}
      {/* TODO: add refresh functionality + add animation */}
      {/* <Refresh /> */}
      {/* </button> */}
    </main>
  );
}
