import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from './constants';

export async function getData() {
  const sql = neon(DATABASE_URL || '');
  const data = await sql`SELECT * FROM expenses`;

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
  if (!regexArr || !message) return null;

  return regexArr?.map((exp) => message.match(exp)).filter((message) => !!message)[0];
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
