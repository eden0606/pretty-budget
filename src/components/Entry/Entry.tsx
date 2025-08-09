'use client';

import type { FormData } from '@/types';
import { useState } from 'react';
import CircleMinus from '../svgs/CircleMinus';
import CirclePlus from '../svgs/CirclePlus';
import Edit from '../svgs/Edit';
import Trash from '../svgs/Trash';
import Check from '../svgs/Check';
import { formatDate, truncateString } from '@/lib/helpers';
import { CARD_NAMES, CATEGORY } from '@/lib/constants';
import CreditCard from '../svgs/CreditCard';
import ShoppingBasket from '../svgs/ShoppingBasket';
import SackOfMoney from '../svgs/SackOfMoney';
import Store from '../svgs/Store';
import List from '../svgs/List';
import Heart from '../svgs/Heart';
import Notes from '../svgs/Notes';
import { useRouter } from 'next/navigation';
import styles from './Entry.module.scss';

interface EntryProps {
  data: FormData;
}

const Entry: React.FC<EntryProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [finalizedData, setFinalizedData] = useState(data);

  const router = useRouter();

  const handleChange = (e: any) => {
    const id = e.currentTarget.id;
    let value = e.currentTarget.value;

    if (id === 'amount') {
      setFinalizedData((prev) => ({
        ...prev,
        [id]: Number(value) || ''
      }));
    } else {
      setFinalizedData((prev) => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    setIsEditing(false);
    e.preventDefault();

    // TODO: add clause for authenticated users
    // if (isAuthenticated) {
    try {
      const response = await fetch('/api/expenses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalizedData)
      });

      const result = await response.json();
    } catch (err) {
      console.error('API call failed:', err);
    }
    // TODO: add popup animation here
    router.refresh();
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();

    // TODO: add clause for authenticated users
    // if (isAuthenticated) {
    try {
      const response = await fetch('/api/expenses', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: finalizedData.id
        })
      });

      const result = await response.json();
    } catch (err) {
      console.error('API call failed:', err);
    }

    // TODO: add popup animation here
    router.refresh();
  };

  return (
    // TODO: add slide down/smooth animation as you open/close
    <div className={styles.entry}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.circleButton}>
        {isOpen ? <CircleMinus /> : <CirclePlus />}
      </button>
      {!isOpen ? (
        <div className={styles.closed}>
          <p className={styles.date}>{formatDate(finalizedData.date)}</p>
          <div className={styles.divider} />
          <div className={styles.details}>
            <p className={styles.purchase}>{truncateString(finalizedData.purchase, 12)}</p>
            <p>${finalizedData.amount}</p>
          </div>
        </div>
      ) : (
        <div className={styles.open}>
          <div className={styles.bubbles}>
            <p className={styles.date}>{formatDate(finalizedData.date)}</p>
            <div className={styles.divider} />
            <p className={styles.id}>{finalizedData.id}</p>
          </div>
          <div className={styles.details}>
            <div className={styles.field}>
              <label htmlFor="purchase">
                <ShoppingBasket />
              </label>
              <input
                type="text"
                id="purchase"
                name="purchase"
                value={finalizedData.purchase}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="amount">
                <SackOfMoney />
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={finalizedData.amount}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="store">
                <Store />
              </label>
              <input
                type="text"
                id="store"
                name="store"
                value={finalizedData.store}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="category">
                <List />
              </label>
              <select
                name="category"
                id="category"
                value={finalizedData.category}
                onChange={handleChange}
                required
              >
                {CATEGORY.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="want_or_need">
                <Heart />
              </label>
              <select
                name="want_or_need"
                id="want_or_need"
                value={finalizedData.want_or_need}
                onChange={handleChange}
                required
              >
                <option value="want">want</option>
                <option value="need">need</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="card">
                <CreditCard />
              </label>
              <select
                name="card"
                id="card"
                value={finalizedData.card}
                onChange={handleChange}
                required
              >
                {CARD_NAMES.map((card) => {
                  return (
                    <option key={card} value={card}>
                      {card}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="notes">
                <Notes />
              </label>
              <input
                type="text"
                id="notes"
                name="notes"
                value={finalizedData.notes}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.modifyButtons}>
            <div className={styles.left}>
              {/* TODO: when edit is selected, remove disable from inputs */}
              <button className={styles.edit} onClick={() => setIsEditing(true)}>
                <Edit />
              </button>
              <button className={styles.delete} onClick={handleDelete}>
                <Trash />
              </button>
            </div>
            {isEditing && (
              <button className={styles.check} onClick={handleSubmit}>
                <Check />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Entry;
