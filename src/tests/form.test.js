import { findMatch, parseMessage } from '@/lib/helpers';
import { FREQUENT_PURCHASES, FREQUENT_CATEGORIES, WANT_OR_NEED } from '@/lib/constants';

test('wells fargo - 6919', () => {
  const message =
    'Wells Fargo Alert: Credit card ending ...4376 was used at BPS*BILT B RENT PMT for $1540.77. Questions? Call number on card.';
  card = findMatch(message, CARDS) || {};

  const parsedMessage = parseMessage(card.regex, message);

  if (parsedMessage) {
    amount = parseFloat(parsedMessage[card.amountIndex || 0]);
    store = parsedMessage[card.storeIndex || 0].toLowerCase();
    purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
  }

  expect(card).toBe('wells fargo - active cash - 6919');
  expect(amount).toBe(1540.77);
  expect(store).toBe('bps*bilt b rent pmt');
  expect(purchase).toBe('rent');
  expect(category).toBe('rent');
  expect(wantOrNeed).toBe('need');
});
