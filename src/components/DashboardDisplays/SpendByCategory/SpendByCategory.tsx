'use client';

import NoData from '../NoData';
import styles from './SpendByCategory.module.scss';
import { CATEGORY_SVGS } from '@/lib/constants';

interface SpendByCategoryProps {
  data: Record<string, any>[];
}

const SpendByCategory: React.FC<SpendByCategoryProps> = ({ data }) => {
  return data.length > 0 ? (
    <div className={styles.display}>
      {data.map((data, index) => {
        if (data.category && CATEGORY_SVGS[data.category]) {
          return (
            <div key={`${data.category}-${index}`} className={styles.category}>
              {CATEGORY_SVGS[data.category]}
              <p>${data.total.toFixed(2)}</p>
              <p>{data.category}</p>
            </div>
          );
        }
      })}
    </div>
  ) : (
    <NoData />
  );
};

export default SpendByCategory;
