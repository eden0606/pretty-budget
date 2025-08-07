import styles from './page.module.scss';
import { findMatch, formatDate, isAuthenticated, parseMessage } from '@/lib/helpers';
import { CARDS, FREQUENT_CATEGORIES, FREQUENT_PURCHASES, WANT_OR_NEED } from '@/lib/constants';
import Form from '@/components/Form';

interface PageProps {
  searchParams: Promise<any>;
}

export default async function Page({ searchParams }: PageProps) {
  const { message, key } = await searchParams;

  let purchase = '';
  let card: { name?: string; regex?: RegExp[]; amountIndex?: number; storeIndex?: number } = {
    name: 'wells fargo - active cash - 6919'
  };
  let category = 'other';
  let wantOrNeed = 'want';
  let amount = 0.0;
  let store = '';

  const date = formatDate(new Date());

  console.log(date, 'date');

  if (message) {
    card = findMatch(message, CARDS) || {};

    const parsed = parseMessage(card.regex, message);

    amount = parseFloat(parsed.amount);
    store = parsed.store;
    purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
  }

  const data = {
    purchase,
    card: card.name || 'wells fargo - active cash - 6919',
    store,
    amount,
    category,
    wantOrNeed,
    date
  };

  return (
    <div className={styles.form}>
      <Form data={data} isAuthenticated={isAuthenticated(key)} />
    </div>
  );
}
