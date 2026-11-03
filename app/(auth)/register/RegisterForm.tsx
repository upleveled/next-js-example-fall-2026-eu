'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { RegisterResponseBodyPost } from '../api/register/route';

type Props = {
  returnTo: string | string[] | undefined;
};

export default function RegisterForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({
            user: {
              username: username,
              password: password,
            },
          }),
        });

        const responseBody =
          (await response.json()) as RegisterResponseBodyPost;

        if ('error' in responseBody) {
          setErrorMessage(responseBody.error);
          return;
        }

        setErrorMessage('');

        // Redirect after register to either:
        // 1. returnTo (page user was trying to access)
        // 2. Profile page
        router.push(
          getSafeReturnToPath(props.returnTo) ||
            `/profile/${responseBody.user.username}`,
        );

        // Show username in the header immediately
        router.refresh();
      }}
    >
      <label>
        Username
        <input
          // Enable browser autocomplete
          autoComplete="username"
          required
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value);
          }}
        />
      </label>

      <label>
        Password
        <input
          // Enable browser autocomplete
          autoComplete="new-password"
          required
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </label>

      <button>Register</button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </form>
  );
}
