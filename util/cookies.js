import { cookies } from 'next/headers';
import { parseJson } from './json';

export async function getCookie() {
  return parseJson((await cookies()).get('fruitComments')?.value);
}
