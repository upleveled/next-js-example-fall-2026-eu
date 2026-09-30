import { cookies } from 'next/headers';
import CookieForm from './CookieForm';

export const metadata = {
  title: 'Cookies - Language Switcher',
  description: 'Demo of using cookies in Next.js with a language switcher',
};

export default async function CookiesLangSwitcherPage() {
  // 1. Read cookie
  const language = (await cookies()).get('lang')?.value || '';

  const greetings = {
    '': 'Choose your language',
    en: 'Welcome',
    nl: 'Welkom',
  };

  return (
    <div>
      <h1>{greetings[language]}</h1>
      <CookieForm
        // Workaround for bug in React
        // https://github.com/facebook/react/issues/30580
        key={language}

        language={language}
      />
    </div>
  );
}
