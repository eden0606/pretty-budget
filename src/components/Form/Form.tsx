'use client';
import { CARD_NAMES, CATEGORY, FREQUENT_CATEGORIES, WANT_OR_NEED } from '@/lib/constants';
import { findMatch } from '@/lib/helpers';
import { useState } from 'react';
import Edit from '../svgs/Edit';
import Copy from '../svgs/Copy';
import styles from './Form.module.scss';

interface FormProps {
  data: {
    purchase: string;
    card: string;
    store: string;
    amount: number;
    category: string;
    wantOrNeed: string;
    date: string;
    id?: number;
  };
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
    wantOrNeed: 'want',
    date: data.date,
    id: undefined
  };

  const [finalizedData, setFinalizedData] = useState(data);
  const [submitText, setSubmitText] = useState('successfully submitted ᕙ(‾̀◡‾́)ᕗ');

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [hasErrors, setHasErrors] = useState(true);
  const isSubmitted = submitText === 'successfully submitted ᕙ(‾̀◡‾́)ᕗ';

  const handleChange = (e: any) => {
    const id = e.currentTarget.id;
    let value = e.currentTarget.value;

    switch (id) {
      case 'amount':
        value = Number(value);
        break;
      case 'purchase':
    }

    if (id === 'amount') {
      setFinalizedData((prev) => ({
        ...prev,
        [id]: Number(value)
      }));
    } else if (id === 'purchase') {
      const category = (findMatch(value, FREQUENT_CATEGORIES) || data.category).toString();
      const wantOrNeed = (findMatch(category, WANT_OR_NEED) || data.wantOrNeed).toString();

      setFinalizedData((prev) => ({
        ...prev,
        [id]: value,
        ['category']: category,
        ['wantOrNeed']: wantOrNeed
      }));
    } else if (id === 'category') {
      const wantOrNeed = (findMatch(value, WANT_OR_NEED) || data.wantOrNeed).toString();

      setFinalizedData((prev) => ({
        ...prev,
        [id]: value,
        ['wantOrNeed']: wantOrNeed
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

    if (isAuthenticated) {
      try {
        let response;
        if (!shouldUpdate) {
          response = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalizedData)
          });
        } else {
          response = await fetch('/api/expenses', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalizedData)
          });
        }

        const result = await response.json();

        let text = 'successfully submitted ᕙ(‾̀◡‾́)ᕗ';

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
      <h3>✿ ͡◕ ᴗ◕)つ━━✫・*。</h3>
      {/* TODO: add validation, using zod schema ??? */}
      <form>
        <div className={styles.field}>
          <label htmlFor="date">date</label>
          <input
            type="text"
            id="date"
            name="date"
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
            placeholder={'0'}
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
          <div className={styles.field}>
            <label htmlFor="wantOrNeed">w/n?</label>
            <select
              name="wantOrNeed"
              id="wantOrNeed"
              value={finalizedData.wantOrNeed}
              onChange={handleChange}
              required
            >
              <option value="want">want</option>
              <option value="need">need</option>
            </select>
          </div>
        </div>
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
