import { CARDS, FREQUENT_CATEGORIES, FREQUENT_PURCHASES, WANT_OR_NEED } from './constants';
import { findMatch, parseMessage } from './helpers';

const wfActiveCashMessage =
  'Wells Fargo Alert: Credit card ending ...6919 was used at TOWB Parking-Citations for $53.50. Questions? Call number on card.';

describe('wf - active cash - 6919 -> should match as expected', () => {
  it('should return expected values', () => {
    const card: { [key: string]: any } = findMatch(wfActiveCashMessage, CARDS) || {};
    expect(card.name).toBe('wells fargo - active cash - 6919');

    const { amount, store } = parseMessage(card.regex, wfActiveCashMessage);
    expect(parseFloat(amount)).toEqual(53.5);
    expect(store).toBe(store.toLowerCase());

    const purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    expect(purchase).toBe('parking');

    const category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    expect(category).toBe('activities/travel');

    const wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
    expect(wantOrNeed).toBe('want');
  });
});

const wfBiltMessage =
  'Wells Fargo Alert: Credit card ending ...4376 was used at BPS*BILT B RENT PMT for $1540.77. Questions? Call number on card.';

describe('wf - bilt - 4376 -> should match as expected', () => {
  it('should return expected values', () => {
    const card: { [key: string]: any } = findMatch(wfBiltMessage, CARDS) || {};
    expect(card.name).toBe('wells fargo - bilt - 4376');

    const { amount, store } = parseMessage(card.regex, wfBiltMessage);
    expect(parseFloat(amount)).toEqual(1540.77);
    expect(store).toBe(store.toLowerCase());

    const purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    expect(purchase).toBe('rent');

    const category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    expect(category).toBe('rent');

    const wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
    expect(wantOrNeed).toBe('need');
  });
});

const chaseSapphireMessage =
  'Chase Sapphire Preferred Visa: You made a $21.59 transaction with MOZARTS COFFEE ROAST on Aug 6, 2025 at 2:31 PM ET.';

describe('chase - sapphire - 3007 -> should match as expected', () => {
  it('should return expected values', () => {
    const card: { [key: string]: any } = findMatch(chaseSapphireMessage, CARDS) || {};
    expect(card.name).toBe('chase - sapphire preferred - 3007');

    const { amount, store } = parseMessage(card.regex, chaseSapphireMessage);
    expect(parseFloat(amount)).toEqual(21.59);
    expect(store).toBe(store.toLowerCase());

    const purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    expect(purchase).toBe('coffee');

    const category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    expect(category).toBe('dining out');

    const wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
    expect(wantOrNeed).toBe('want');
  });
});

const chaseSapphireMessageOPM =
  'Chase Sapphire Preferred Visa: You made an online, phone, or mail transaction of $25.00 with HOTEL LELA WILMINGTO on Aug 2, 2025 at 8:22 AM ET.';

describe('chase - sapphire - opm - 3007 -> should match as expected', () => {
  it('should return expected values', () => {
    const card: { [key: string]: any } = findMatch(chaseSapphireMessageOPM, CARDS) || {};
    expect(card.name).toBe('chase - sapphire preferred - 3007');

    const { amount, store } = parseMessage(card.regex, chaseSapphireMessageOPM);
    expect(parseFloat(amount)).toEqual(25);
    expect(store).toBe(store.toLowerCase());

    const purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    expect(purchase).toBe('');

    const category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    expect(category).toBe('other');

    const wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
    expect(wantOrNeed).toBe('want');
  });
});

const chasePrimeMessage =
  'Prime Visa: You made a $44.67 transaction with Amazon.com on Aug 8, 2025 at 5:02 AM ET.';

describe('chase - prime - 9337 -> should match as expected', () => {
  it('should return expected values', () => {
    const card: { [key: string]: any } = findMatch(chasePrimeMessage, CARDS) || {};
    expect(card.name).toBe('chase - prime - 9337');

    const { amount, store } = parseMessage(card.regex, chasePrimeMessage);
    expect(parseFloat(amount)).toEqual(44.67);
    expect(store).toBe(store.toLowerCase());

    const purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    expect(purchase).toBe('');

    const category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    expect(category).toBe('other');

    const wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
    expect(wantOrNeed).toBe('want');
  });
});

const chasePrimeMessageOPM =
  'Prime Visa: You made an online, phone, or mail transaction of $23.60 with Amazon.com on Aug 8, 2025 at 5:02 AM ET.';

describe('chase - prime - 9337 -> should match as expected', () => {
  it('should return expected values', () => {
    const card: { [key: string]: any } = findMatch(chasePrimeMessageOPM, CARDS) || {};
    expect(card.name).toBe('chase - prime - 9337');

    const { amount, store } = parseMessage(card.regex, chasePrimeMessageOPM);
    expect(parseFloat(amount)).toEqual(23.6);
    expect(store).toBe(store.toLowerCase());

    const purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    expect(purchase).toBe('');

    const category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    expect(category).toBe('other');

    const wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
    expect(wantOrNeed).toBe('want');
  });
});

const discoverMessage =
  'Discover Card Alert: A transaction of $104.89 at ALDI 66087 on May 25, 2025. No Action needed. See it at https://app.discover.com/ACTVT. Text STOP to end';

describe('discover - it - 4217 -> should match as expected', () => {
  it('should return expected values', () => {
    const card: { [key: string]: any } = findMatch(discoverMessage, CARDS) || {};
    expect(card.name).toBe('discover - it - 4217');

    const { amount, store } = parseMessage(card.regex, discoverMessage);
    expect(parseFloat(amount)).toEqual(104.89);
    expect(store).toBe(store.toLowerCase());

    const purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    expect(purchase).toBe('groceries');

    const category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    expect(category).toBe('groceries');

    const wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
    expect(wantOrNeed).toBe('need');
  });
});

const citiMessage =
  'Citi Alert: A $18.15 transaction was made at H-E-B 465 AUSTIN US on card ending in 2983. View details at citi.com/citimobileapp';

describe('citi - custom cash - 2983 -> should match as expected', () => {
  it('should return expected values', () => {
    const card: { [key: string]: any } = findMatch(citiMessage, CARDS) || {};
    expect(card.name).toBe('citi - custom cash - 2983');

    const { amount, store } = parseMessage(card.regex, citiMessage);
    expect(parseFloat(amount)).toEqual(18.15);
    expect(store).toBe(store.toLowerCase());

    const purchase = findMatch(store, FREQUENT_PURCHASES)?.toString() || '';
    expect(purchase).toBe('');

    const category = findMatch(purchase, FREQUENT_CATEGORIES)?.toString() || 'other';
    expect(category).toBe('other');

    const wantOrNeed = findMatch(category, WANT_OR_NEED)?.toString() || 'want';
    expect(wantOrNeed).toBe('want');
  });
});

export {};
