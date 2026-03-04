'use client';

import { getStatementDates } from '@/lib/helpers';
import NoData from '../NoData';
import styles from './BiltSpend.module.scss';

interface BiltSpendProps {
  data: Record<string, any>;
}
// TODO: optimize
const BiltSpend: React.FC<BiltSpendProps> = ({ data }) => {
  const { startDate, endDate } = getStatementDates();

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
