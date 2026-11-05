import { cache } from 'react';
import type { Session } from '../migrations/00007-createTableSessions';
import type { Note } from '../migrations/00008-createTableNotes';
import { sql } from './connect';

// Secure database query functions below, with
// verification of session token

export const getNotes = cache(async (sessionToken: Session['token']) => {
  const notes = await sql<Note[]>`
    SELECT
      notes.id,
      notes.title,
      notes.text_content,
      notes.user_id
    FROM
      notes
      --
      -- Skip joining with users, because we don't
      -- need information from the users table and
      -- the notes table already has user_id
      -- INNER JOIN users ON (notes.user_id = users.id)
      --
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND notes.user_id = sessions.user_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return notes;
});

export const getNote = cache(
  async (sessionToken: Session['token'], id: number) => {
    const [note] = await sql<Note[]>`
      SELECT
        notes.*
      FROM
        notes
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND notes.user_id = sessions.user_id
          AND sessions.expiry_timestamp > now()
        )
      WHERE
        notes.id = ${id}
    `;
    return note;
  },
);

export const createNote = cache(
  async (
    sessionToken: Session['token'],
    newNote: { title: Note['title']; textContent: Note['textContent'] },
    // Alternative: use TypeScript Pick<> utility type
    // Pick<Note, 'title' | 'textContent'>
  ) => {
    const [note] = await sql<Note[]>`
      INSERT INTO
        notes (title, text_content, user_id)
      SELECT
        ${newNote.title},
        ${newNote.textContent},
        -- Security: derive user_id from session token instead
        -- of allowing user to choose which user_id they
        -- assign the note to
        sessions.user_id
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
      RETURNING
        id,
        title,
        text_content,
        user_id
    `;
    return note;
  },
);

// Insecure database query functions below, without
// verification of session token

export const getNoteExistsInsecure = cache(async (noteId: Note['id']) => {
  const [record] = await sql<{ exists: boolean }[]>`
    SELECT
      EXISTS (
        SELECT
          1
        FROM
          notes
        WHERE
          notes.id = ${noteId}
      )
  `;
  return !!record?.exists;
});
