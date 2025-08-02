'use client';
import { CARD_NAMES, CATEGORY } from '@/lib/constants';
import { useState } from 'react';
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
  };
}

const Form: React.FC<FormProps> = (props) => {
  const { data } = props;
  const resetState = {
    purchase: '',
    card: 'wells fargo - active cash - 6919',
    store: '',
    amount: 0,
    category: 'other',
    wantOrNeed: 'want',
    date: data.date
  };

  const [finalizedData, setFinalizedData] = useState(data);
  const [submitText, setSubmitText] = useState('。*・✫━━ submitting ━━✫・*。');

  const handleChange = (e: any) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;

    setFinalizedData((prev) => ({
      ...prev,
      [id]: id === 'amount' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: any) => {
    setSubmitText('。*・✫━━ submitting ━━✫・*。');

    e.preventDefault();
    const successElement = document.getElementById('success') as HTMLElement;
    successElement.style.display = 'flex';

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalizedData)
      });

      const result = await response.json();

      setTimeout(() => {
        let text = "couldn't submit form, please try again !";

        if (response.status === 201) {
          text = 'successfully submitted ᕙ(‾̀◡‾́)ᕗ';
          setFinalizedData(resetState);
        }

        setSubmitText(text);
        setTimeout(() => {
          successElement.style.display = 'none';
        }, 750);
      }, 1000);
    } catch (err) {
      console.error('API call failed:', err);
    }
  };

  return (
    <div className={styles.form}>
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
        <p>{submitText}</p>
        {/* TODO: add edit ability on submit */}
      </div>
    </div>
  );
};

export default Form;
