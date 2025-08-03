import styles from './page.module.scss';
import { findMatch, isAuthenticated } from '@/lib/helpers';
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
  let store = '';
  let amount;
  let category = 'other';
  let wantOrNeed = 'want';

  const dateNow = new Date();
  let date = dateNow.toISOString().substring(0, 10);

  if (message) {
    card = findMatch(message, CARDS) || {};

    const parsedMessage = card?.regex
      ?.map((exp) => message.match(exp))
      .filter((message) => !!message)[0];

    if (parsedMessage) {
      amount = parsedMessage[card.amountIndex || 0];
      store = parsedMessage[card.storeIndex || 0].toLowerCase();
      purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
      category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
      wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
    }
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
