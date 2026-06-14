import styles from './page.module.scss';
import { findMatch, formatISODate, isAuthenticated, parseMessage } from '@/lib/helpers';
import { CARDS, FREQUENT_CATEGORIES, FREQUENT_PURCHASES, WANT_OR_NEED } from '@/lib/constants';
import Form from '@/components/Form';
import { getLocalTimezoneDateServer } from '../dashboard/page';

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
  let want_or_need = 'want';
  let amount = 0.0;
  let store = '';

  const serverDate = await getLocalTimezoneDateServer();
  const date = formatISODate(serverDate);

  if (message) {
    card = findMatch(message, CARDS) || {};

    const parsed = parseMessage(card.regex, message);

    amount = parseFloat(parsed.amount);
    store = parsed.store;
    purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    want_or_need = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
  }

  const defaultData = {
    purchase,
    card: card.name || 'wells fargo - active cash - 6919',
    store,
    amount,
    category,
    want_or_need,
    date
  };

  let data;
  let mergedData = { ...defaultData };

  if (store) {
    try {
      let response;
      response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/expenses?query=predictive_search&params=${store}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store'
        }
      );

      data = await response.json();
    } catch (err) {
      console.error('API call failed:', err);
    }
  }

  mergedData = {
    ...mergedData,
    ...(data?.purchase && { purchase: data.purchase }),
    ...(data?.category && { category: data.category }),
    ...(data?.want_or_need && { want_or_need: data.want_or_need })
  };

  return (
    <main className={styles.form}>
      <Form data={mergedData} isAuthenticated={isAuthenticated(key)} />
    </main>
  );
}
