import Link from 'next/link';
import { getUser } from '../database/users';
import { getCookie } from '../util/cookies';
import LogoutButton from './(auth)/logout/LogoutButton';
import styles from './Header.module.scss';
import RouterRefreshButton from './RouterRefreshButton';

export default async function Header() {
  // 1. Get session token from cookie
  const sessionToken = await getCookie('sessionToken');

  // 2. Get user by session token
  const user = !!sessionToken && (await getUser(sessionToken));

  return (
    <header className={styles.header}>
      <div>
        <div>Animals Anonymous</div>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/animals">Animals</Link>
          <Link href="/fruits">Fruits</Link>
        </nav>
      </div>
      <div>
        <div>
          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
              <Link href={`/profile/${user.username}`}>{user.username}</Link>
              <Link href="/animals/dashboard">Dashboard</Link>
              <Link href="/notes">Notes</Link>
              <LogoutButton />
            </>
          )}
          {/* eslint-disable-next-line react-hooks/purity */}
          <div>{Math.floor(Math.random() * 100)}</div>
          <RouterRefreshButton />
        </div>
      </div>
    </header>
  );
}
