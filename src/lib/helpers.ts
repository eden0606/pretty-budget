import { neon } from '@neondatabase/serverless';

export async function getData() {
  const sql = neon(process.env.DATABASE_URL || '');
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
