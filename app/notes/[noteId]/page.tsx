import Link from 'next/link';
import { forbidden, notFound, redirect } from 'next/navigation';
import { getNote, getNoteExistsInsecure } from '../../../database/notes';
import { getValidSession } from '../../../database/sessions';
import { getCookie } from '../../../util/cookies';

export async function generateMetadata(props: PageProps<'/notes/[noteId]'>) {
  const sessionToken = await getCookie('sessionToken');

  if (!sessionToken) {
    return {
      title: 'Note not found',
    };
  }

  const params = await props.params;
  const note = await getNote(sessionToken, Number(params.noteId));

  if (!note) {
    return {
      title: 'Note not found',
    };
  }

  return {
    title: note.title,
    description: `Private note "${note.title}"`,
  };
}

export default async function NotePage(props: PageProps<'/notes/[noteId]'>) {
  // Note authorization steps in page

  // 1. Get session token from cookie
  const sessionToken = await getCookie('sessionToken');

  const noteId = Number((await props.params).noteId);

  if (!sessionToken) {
    redirect(`/login?returnTo=/notes/${noteId}`);
  }

  // 2. Check if note exists
  const [validSession, noteExists] = await Promise.all([
    getValidSession(sessionToken),
    getNoteExistsInsecure(noteId),
  ]);

  if (!validSession) {
    redirect(`/login?returnTo=/notes/${noteId}`);
  }

  if (!noteExists) {
    notFound();
  }

  // 3. Get note by session token and note ID
  const note = !!sessionToken && (await getNote(sessionToken, noteId));

  // 4. If note exists but does not belong to current user, show restricted access message
  //
  // Security: This can be an antipattern for security, because of "information
  // exposure": it tells the user that a note with this id exists. Instead,
  // consider showing only the 404 Not Found page in both cases.
  if (!note) {
    forbidden();
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.textContent}</p>
      <Link href="/notes">Back to notes</Link>
    </div>
  );
}
