'use client';

import { formatISODate, getStatementDates } from '@/lib/helpers';
import NoData from '../NoData';
import styles from './BiltSpend.module.scss';

interface BiltSpendProps {
  data: Record<string, any>;
}
// TODO: optimize
const BiltSpend: React.FC<BiltSpendProps> = ({ data }) => {
  const { startDate, endDate } = getStatementDates();
  const totalRemainingRequiredSpend = (400 - data[0].total).toFixed(2);

  return data.length > 0 && data[0].total ? (
    <div className={styles.display}>
      <p className={styles.title}>statement period</p>
      <p className={styles.statementDates}>
        {formatISODate(startDate)} - {formatISODate(endDate)}
      </p>
      <div className={styles.line} />

      <div className={styles.calculation}>
        <div className={styles.mathWrapper}>
          <div className={styles.math}>
            <p className={styles.requiredSpend}>$400.00</p>
            <p className={styles.minus}>-</p>
            <p className={styles.total}>${data[0].total.toFixed(2)}</p>
            <p className={styles.line}></p>
            <p className={styles.totalRemaining}>${totalRemainingRequiredSpend}</p>
          </div>
        </div>
        <div className={styles.titles}>
          <p>required spend</p>
          <p>current spend</p>
          <p>remaining spend</p>
        </div>
      </div>
    </div>
  ) : (
    <NoData />
  );
};

export default BiltSpend;
