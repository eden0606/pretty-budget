import type { FormData } from '@/types';
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL, MONTHS, WEEKDAYS } from './constants';

export async function getColumnNames() {
  const sql = neon(DATABASE_URL || '');

  const data = await sql`
  SELECT column_name
  FROM information_schema.columns
  WHERE table_name = 'expenses'
  ORDER BY ORDINAL_POSITION
`;

  return data;
}

export const findMatch = (str: string, collection: { [key: string]: string | {} }) => {
  const lowerInput = str.toLowerCase();

  const matchedKey = Object.keys(collection).find((key) => lowerInput.includes(key.toLowerCase()));

  return matchedKey ? collection[matchedKey] : null;
};

export const isAuthenticated = (key: string) => {
  if (key === process.env.AUTH_KEY) {
    return true;
  }

  return false;
};

export const parseMessage = (regexArr: RegExp[] | undefined, message: string) => {
  let amount = '';
  let store = '';

  if (!regexArr || !message) return { amount, store };

  const match = regexArr?.map((exp) => message.match(exp)).filter((message) => !!message)[0];

  if (!match) return { amount, store };

  const group = match.slice(1);

  for (const item of group) {
    if (/^\d+\.?\d*$/.test(item)) {
      amount = item.toLowerCase();
    } else {
      store = item.toLowerCase();
    }
  }

  return { amount, store };
};

export const formatISODate = (date: Date | string) => {
  let detectedTimeZone: string | undefined;
  try {
    detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    console.warn('Timezone detection failed, falling back to UTC');
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: detectedTimeZone || 'UTC'
  });
};

export const formatFullDate = (date: Date) => {
  const weekday = date.getDay();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${WEEKDAYS[weekday]}, ${MONTHS[month]} ${day}, ${year}`;
};

export const truncateString = (str: string, maxLen: number) => {
  if (str.length > maxLen) {
    return str.slice(0, maxLen - 3) + '...';
  }
  return str;
};
