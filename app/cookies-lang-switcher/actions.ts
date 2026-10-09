'use server';

import { cookies } from 'next/headers';

// 3. Server Action to set the cookie securely on the server
export async function createCookie(value: string) {
  (await cookies()).set('lang', value);
}
