import { cache } from 'react';
import type { User } from '../migrations/00006-createTableUsers';
import { sql } from './connect';

export const getUserInsecure = cache(async (username: User['username']) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashInsecure = cache(
  async (username: User['username']) => {
    // Security: leave out `password_hash` in TypeScript type to:
    // 1. Make access of `password_hash` intentional
    // 2. Ensure TypeScript and SafeQL catch incorrect usage
    type UserWithPasswordHash = User & {
      passwordHash: string;
    };

    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        id,
        username,
        password_hash
      FROM
        users
      WHERE
        username = ${username.toLowerCase()}
    `;
    return user;
  },
);

export const createUserInsecure = cache(
  async (username: User['username'], passwordHash: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (username, password_hash)
      VALUES
        (
          ${username.toLowerCase()},
          ${passwordHash}
        )
      RETURNING
        id,
        username
    `;
    return user;
  },
);
