import './globals.scss';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from './Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    default: 'Animals Anonymous',
    template: '%s | Animals Anonymous',
  },
};

export default function RootLayout(props) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <main>{props.children}</main>
      </body>
    </html>
  );
}
