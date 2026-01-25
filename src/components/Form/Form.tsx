'use client';

import type { FormData } from '@/types';
import { CARD_NAMES, CATEGORY, FREQUENT_CATEGORIES, WANT_OR_NEED } from '@/lib/constants';
import { findMatch, formatDateInput, formatISODate, validateDate } from '@/lib/helpers';
import { useState } from 'react';
import Edit from '../svgs/Edit';
import Copy from '../svgs/Copy';
import styles from './Form.module.scss';
import CirclePlus from '../svgs/CirclePlus';
import CircleMinus from '../svgs/CircleMinus';
import Flag from '../svgs/Flag';

interface FormProps {
  data: FormData;
  isAuthenticated: boolean;
}

const Form: React.FC<FormProps> = (props) => {
  const { data, isAuthenticated } = props;
  const resetState = {
    purchase: '',
    card: 'wells fargo - active cash - 6919',
    store: '',
    amount: 0,
    category: 'other',
    want_or_need: 'want',
    date: formatISODate(data.date),
    id: undefined,
    notes: '',
    flag: false
  };

  const [finalizedData, setFinalizedData] = useState({ ...data, date: formatISODate(data.date) });
  const [submitText, setSubmitText] = useState('successfully submitted ᕙ(‾̀◡‾́)ᕗ');
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [hasErrors, setHasErrors] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  const isSubmitted = submitText.includes('successfully');

  const handleChange = (e: any) => {
    const id = e.currentTarget.id;
    let value = e.currentTarget.value;

    if (id === 'amount') {
      setFinalizedData((prev) => ({
        ...prev,
        [id]: value ?? Number(value)
      }));
    } else if (id === 'purchase') {
      const category = (findMatch(value, FREQUENT_CATEGORIES) || data.category).toString();
      const want_or_need = (findMatch(category, WANT_OR_NEED) || data.want_or_need).toString();

      setFinalizedData((prev) => ({
        ...prev,
        [id]: value,
        ['category']: category,
        ['want_or_need']: want_or_need
      }));
    } else if (id === 'category') {
      const want_or_need = (findMatch(value, WANT_OR_NEED) || data.want_or_need).toString();

      setFinalizedData((prev) => ({
        ...prev,
        [id]: value,
        ['want_or_need']: want_or_need
      }));
    } else if (id === 'flag') {
      setFinalizedData((prev) => ({
        ...prev,
        [id]: !isFlagged
      }));
      setIsFlagged(!isFlagged);
    } else if (id === 'date') {
      const date = formatDateInput(value);

      setFinalizedData((prev) => ({
        ...prev,
        [id]: date
      }));
    } else {
      setFinalizedData((prev) => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    setSubmitText('。*・✫━━<br/>submitting<br/>━━✫・*。');
    // may need to change this logic later when adding in validation
    setHasErrors(false);

    e.preventDefault();
    const successElement = document.getElementById('success') as HTMLElement;
    successElement.style.display = 'flex';

    let text = 'successfully submitted ᕙ(‾̀◡‾́)ᕗ';

    if (isAuthenticated) {
      try {
        let response;
        if (!shouldUpdate) {
          response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/expenses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalizedData)
          });
        } else {
          text = 'successfully updated ᕙ(‾̀◡‾́)ᕗ';
          response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/expenses`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalizedData)
          });
        }

        const result = await response.json();

        if (response.status !== 201) {
          text = "couldn't submit form, please try again !";
          setHasErrors(true);
        } else {
          setFinalizedData((prev) => ({
            ...prev,
            ['id']: result.id
          }));
        }

        setSubmitText(text);
      } catch (err) {
        console.error('API call failed:', err);
      }
    } else {
      setSubmitText('successfully submitted ᕙ(‾̀◡‾́)ᕗ');
    }
  };

  const handleState = async (e: any, state: 'edit' | 'copy' | 'done') => {
    const successElement = document.getElementById('success') as HTMLElement;

    if (state === 'done') {
      setFinalizedData(resetState);
    } else if (state === 'edit') {
      setShouldUpdate(true);
    }

    successElement.style.display = 'none';
  };

  return (
    <div className={`${styles.form} ${isAuthenticated ? styles.auth : styles.nonauth}`}>
      <h1>new expense entry</h1>
      <h3>(✿ ͡◕ ᴗ◕)つ━━✫・*。</h3>
      {/* TODO: add validation, using zod schema ??? */}
      <button
        className={`${styles.flag} ${isFlagged && styles.flagged}`}
        id="flag"
        onClick={handleChange}
      >
        <Flag />
      </button>
      <form>
        <div className={styles.field}>
          <label htmlFor="date">date</label>
          <input
            type="text"
            id="date"
            name="date"
            placeholder="mm/dd/yyyy"
            value={finalizedData.date}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={finalizedData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="card">card</label>
          <select name="card" id="card" value={finalizedData.card} onChange={handleChange} required>
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
          <label htmlFor="purchase">purchase</label>
          <input
            type="text"
            id="purchase"
            name="purchase"
            value={finalizedData.purchase}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="store">store</label>
          <input
            type="text"
            id="store"
            name="store"
            value={finalizedData.store}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inline}>
          <div className={styles.field}>
            <label htmlFor="category">category</label>
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
          {/* TODO: change this to snake case? */}
          <div className={styles.field}>
            <label htmlFor="want_or_need">w/n?</label>
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
        </div>
        <button
          className={styles.plusMinusButton}
          onClick={(e) => {
            e.preventDefault();
            setShowNotes(!showNotes);
          }}
        >
          {showNotes ? <CircleMinus /> : <CirclePlus />} <p>add notes</p>
        </button>
        {showNotes && (
          <div className={styles.field}>
            <label htmlFor="notes">notes</label>
            <textarea
              name="notes"
              id="notes"
              value={finalizedData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
        )}

        {/* TODO: add cute loading state */}
        <button onClick={handleSubmit}>٩(•̤̀ᵕ•̤́๑)ᵒᵏᵎᵎᵎᵎ</button>
      </form>
      <div id="success" className={styles.success}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: submitText }} />
          {/* TODO: add edit ability on submit */}
          {isSubmitted && (
            <div className={styles.modify}>
              <button onClick={(e) => handleState(e, 'edit')}>
                <Edit />
              </button>
              <button onClick={(e) => handleState(e, 'copy')}>
                <Copy />
              </button>
            </div>
          )}

          {(isSubmitted || hasErrors) && (
            <div className={styles.done}>
              <button
                onClick={(e) => {
                  if (hasErrors) {
                    handleState(e, 'copy');
                  } else {
                    handleState(e, 'done');
                  }
                }}
              >
                {hasErrors ? 'try again' : 'done'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
