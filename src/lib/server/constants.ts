import { cookies } from 'next/headers';

export const cookieStore = await cookies();
export const timezone = cookieStore.get('x-timezone') || 'America/New_York';
