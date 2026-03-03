import type { FormData } from '@/types';
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL, FREQUENT_CATEGORIES, MONTHS, WANT_OR_NEED, WEEKDAYS } from './constants';
import { Dispatch, SetStateAction } from 'react';

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

export const isAuthenticated = (key: string | null | undefined) => {
  if (!key) return false;

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
    console.warn('Timezone detection failed, falling back to EST');
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: detectedTimeZone || 'EST'
  });
};

export function formatDateInput(date: string) {
  // remove all non-digits
  const digits = date.replace(/\D/g, '');

  // format based on length
  if (digits.length <= 2) {
    return digits;
  } else if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  } else {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  }
}

export const formatFullDate = (date: Date) => {
  const weekday = date.getDay();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${WEEKDAYS[weekday]}, ${MONTHS[month]} ${day}, ${year}`;
};

export const validateDate = (date: string) => {
  console.log(new Date(date), 'date testing');
  if (new Date(date)) {
    return true;
  }

  return false;
};

export const truncateString = (str: string, maxLen: number) => {
  if (str.length > maxLen) {
    return str.slice(0, maxLen - 3) + '...';
  }
  return str;
};

export const generateQueryString = (searchParams: { [key: string]: string }) => {
  const queryString = Object.entries(searchParams)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join('&');
      }
      return `${key}=${value}`;
    })
    .join('&');

  return queryString ? `?${queryString}` : '';
};

export const handleChange = (form: {
  e: any;
  data: FormData;
  setFinalizedData: Dispatch<SetStateAction<FormData>>;
}) => {
  const { e, data, setFinalizedData } = form;

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
      [id]: !prev.flag
    }));
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

export function getStatementDates(inputDate = new Date(), dueDay = 9) {
  // Use provided date or default to today
  const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

  // Get the month and year from the input date
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  // Create the statement end date (due date of the current month)
  const statementEnd = new Date(currentYear, currentMonth, dueDay);

  // Determine if the input date is after the statement end date
  // If input date > statement end date, we're in the next statement period
  if (date > statementEnd) {
    // Statement ends on the due date of the next month
    statementEnd.setMonth(statementEnd.getMonth() + 1);
  }

  // Calculate statement start date (1 month before the end date)
  const statementStart = new Date(statementEnd);
  statementStart.setMonth(statementStart.getMonth() - 1);
  statementStart.setDate(dueDay); // Set to the due day of the previous month

  return {
    startDate: formatDateYYYYMMDD(statementStart),
    endDate: formatDateYYYYMMDD(statementEnd)
  };
}

// Helper function to format dates as YYYY-MM-DD
export function formatDateYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
