'use server';

import { cookies } from 'next/headers';
import { deleteSession } from '../../../database/sessions';
import { getCookie } from '../../../util/cookies';

export async function logout() {
  // User logout steps in Server Action
  // 1. Get session token from cookie
  const sessionToken = await getCookie('sessionToken');

  if (!sessionToken) {
    return;
  }

  // 2. Delete session from `sessions` table
  await deleteSession(sessionToken);

  // 3. Delete cookie from browser
  (await cookies()).delete('sessionToken');
}
