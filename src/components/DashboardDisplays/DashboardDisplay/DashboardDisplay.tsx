'use client';

import { useState } from 'react';
import styles from './DashboardDisplay.module.scss';
import SpendByCategory from '../SpendByCategory';
import NoData from '../NoData';
import { formatDateInput } from '@/lib/helpers';
import BiltSpend from '../BiltSpend';

interface DashboardDisplayProps {
  data: Record<string, any>[];
}

const DashboardDisplay: React.FC<DashboardDisplayProps> = ({ data }) => {
  const spendByCategoryData = data.filter(
    (c) =>
      c.category !== 'yearly_spend' &&
      c.category !== 'monthly_spend' &&
      c.category !== 'daily_spend'
  );

  const biltSpendData = data.filter((s) => s.category === 'bilt_spend');

  const [active, setActive] = useState({ view: 'category', data: spendByCategoryData });
  const [dates, setDates] = useState({
    date1: '',
    date2: formatDateInput(new Date().toDateString())
  });
  const [executeBilt, setExecultBilt] = useState(false);
  //   TODO: optimize how we're setting dates, clean up naming to be more specific
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  const displayMapping: Record<string, any> = {
    category: {
      view: <SpendByCategory data={active.data} />,
      data: spendByCategoryData
    },
    bilt_spend: {
      view: <BiltSpend data={active.data} />,
      data: biltSpendData
    },
    vs_last_month: {
      view: <NoData />,
      data: null
    },
    ytd: {
      view: <NoData />,
      data: null
    },
    wants_vs_needs: {
      view: <NoData />,
      data: null
    }
  };

  return (
    <div>
      <div className={styles.viewSpendInput}>
        <label htmlFor="displays">view spend . . . </label>
        <select
          name="displays"
          id="displays"
          onChange={(e) => {
            const display = e.currentTarget.value;
            setActive({ view: display, data: displayMapping[display].data });
          }}
        >
          <option value="category">by category</option>
          <option value="bilt_spend">on bilt card</option>
          <option value="vs_last_month">vs. last month</option>
          <option value="ytd">over the last year</option>
          <option value="wants_vs_needs">wants vs. needs</option>
        </select>
      </div>
      {displayMapping[active.view].view}
    </div>
  );
};

export default DashboardDisplay;
