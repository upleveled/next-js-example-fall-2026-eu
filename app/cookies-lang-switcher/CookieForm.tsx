'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createCookie } from './actions';

type Props = {
  language: string;
};

export default function CookieForm(props: Props) {
  const [language, setLanguage] = useState(props.language);

  // // Alternative: standalone change handler function, which requires
  // // TypeScript `ChangeEvent` type, imported from React
  // function handleChange(event: ChangeEvent<HTMLSelectElement>) {
  //   setLanguage(event.currentTarget.value);
  // }

  return (
    // 2. Form to run the Server Action
    <form>
      <select
        value={language}
        onChange={(event) => setLanguage(event.currentTarget.value)}
        // onChange={handleChange}
      >
        <option value="">Choose your language</option>
        <option value="en">English</option>
        <option value="nl">Nederlands</option>
      </select>
      <button
        formAction={async () => {
          await createCookie(language);
        }}
      >
        Save
      </button>
      <div>
        This select will not update if you do not use a key prop, because of a{' '}
        <Link href="https://github.com/facebook/react/issues/30580">
          bug in React
        </Link>
      </div>
    </form>
  );
}
