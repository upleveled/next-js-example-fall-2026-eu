'use client';

import { useEffect, useState } from 'react';

export default function AntipatternDocumentCookie() {
  const [language, setLanguage] = useState('');

  useEffect(() => {
    // Create a cookie
    document.cookie = 'name=Oeschger; SameSite=None; Secure';
    document.cookie = 'favorite_food=tripe; SameSite=None; Secure';

    // All cookies
    const cookies = document.cookie;
    console.log('all cookies', cookies);

    // Get a single cookie
    const favoriteFoodCookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('favorite_food='))
      ?.split('=')[1];
    console.log('favorite_food cookie value', favoriteFoodCookieValue);

    // Synchronize the state with the language cookie value
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setLanguage(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('lang='))
        ?.split('=')[1],
    );
  }, []);

  return (
    <select
      value={language}
      onChange={(event) => {
        setLanguage(event.currentTarget.value);

        // Set the `lang` cookie
        document.cookie = `lang=${event.currentTarget.value}; SameSite=None; Secure`;
      }}
    >
      <option value="">Choose your language</option>
      <option value="en">English</option>
      <option value="nl">Nederlands</option>
    </select>
  );
}
