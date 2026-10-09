'use client';

import { useEffect } from 'react';

type Props = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage(props: Props) {
  console.log('props', props);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(props.error);
  }, [props.error]);

  return (
    <div>
      <h1>Something went wrong!</h1>

      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => props.retry()
        }
      >
        Try again
      </button>
    </div>
  );
}
