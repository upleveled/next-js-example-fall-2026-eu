import type { Sql } from 'postgres';
import z from 'zod';
import type { User } from './00006-createTableUsers';

export type Note = {
  id: number;
  title: string;
  textContent: string;
  userId: User['id'];
};

export const noteSchema = z.object({
  note: z.object({
    title: z
      .string()
      .min(1, { error: 'Title must be minimum 1 character' })
      .max(100, { error: 'Title must be maximum 100 characters' }),
    textContent: z
      .string()
      .min(1, { error: 'Text content must be minimum 1 character' })
      .max(50000, { error: 'Text content must be maximum 50000 characters' }),
  }),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE notes (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title varchar(100) NOT NULL,
      text_content text NOT NULL,
      -- ON DELETE CASCADE: if a user is deleted, automatically delete their notes
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE notes`;
}
