import Link from 'next/link';

export default function Forbidden() {
  return (
    <div>
      <h1>Access Denied</h1>
      <div>You do not have permission to access this note</div>
      <div>
        This can be an antipattern for security, because of "information
        exposure": it tells the user that a note with this id exists. Instead,
        consider showing only the 404 Not Found page in both cases (replace
        forbidden() with notFound(), remove getNoteExistsInsecure()).
      </div>
      <div>
        <Link href="/notes">Back to notes</Link>
      </div>
    </div>
  );
}
