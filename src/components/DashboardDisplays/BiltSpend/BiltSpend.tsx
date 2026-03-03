'use client';

import { getStatementDates } from '@/lib/helpers';
import NoData from '../NoData';
import styles from './BiltSpend.module.scss';

interface BiltSpendProps {
  data: Record<string, any>;
}
// TODO: optimize
const BiltSpend: React.FC<BiltSpendProps> = ({ data }) => {
  console.log('data', data);
  const { startDate, endDate } = getStatementDates();
  // if (status) {
  //   try {
  //     let response;
  //     response = await fetch(
  //       `${process.env.NEXT_PUBLIC_APP_URL}/api/expenses?query=bilt&date=${formattedDate(
  //         date1
  //       )}&date2=${formattedDate(date2)}`,
  //       {
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json' },
  //         cache: 'no-store'
  //       }
  //     );

  //     data = await response.json();
  //   } catch (err) {
  //     console.error('API call failed:', err);
  //   }
  // }
  return data.length > 0 && data[0].total ? (
    <div className={styles.display}>
      <p className={styles.statementDates}>
        statement period: {startDate} - {endDate}
      </p>
      <p className={styles.total}>${data[0].total}</p>
    </div>
  ) : (
    <NoData />
  );
};

export default BiltSpend;
