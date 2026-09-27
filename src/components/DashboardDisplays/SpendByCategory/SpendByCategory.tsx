'use client';

import NoData from '../NoData';
import styles from './SpendByCategory.module.scss';
import CategoryButton from './CategoryButton';
import { useState } from 'react';

interface SpendByCategoryProps {
  data: Record<string, any>[];
}

const SpendByCategory: React.FC<SpendByCategoryProps> = ({ data }) => {
  const [activeData, setActiveData] = useState<{
    category: string;
    data: Record<string, any>[];
    total: number;
  }>();
  const [isActive, setIsActive] = useState(false);

  return data.length > 0 ? (
    <div className={styles.display}>
      <div className={styles.categories}>
        {data.map((data, index) => {
          if (data.category) {
            return (
              <button
                key={`${data.category}-${index}`}
                className={styles.category}
                onClick={() => {
                  let total = 0;
                  data.purchases.forEach(
                    (purchase: { amount: number }) => (total += purchase.amount)
                  );
                  setIsActive(true);
                  setActiveData({ category: data.category, data: data.purchases, total });
                }}
              >
                <CategoryButton data={data} />
              </button>
            );
          }
        })}
      </div>
      {isActive && (
        <div className={styles.purchases}>
          <div className={styles.purchasesList}>
            <button onClick={() => setIsActive(false)}>x</button>
            <h3>{activeData?.category}</h3>
            {activeData?.data.map((data, index) => {
              return (
                <div className={styles.item} key={`${data.purchase}-${index}`}>
                  <div className={styles.date}>
                    <p>{data.date.replace('04:00:00+00', '').replace(/\d{4}-/, '')}</p>
                    <p>{data.purchase}</p>
                  </div>
                  <p>${data.amount.toFixed(2)}</p>
                </div>
              );
            })}
            <div className={styles.line} />
            <div className={styles.total}>
              <p>total</p>
              <p>${activeData?.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <NoData />
  );
};

export default SpendByCategory;
