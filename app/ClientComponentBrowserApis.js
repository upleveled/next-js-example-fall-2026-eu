'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function ClientComponentBrowserApis() {
  const documentTitle = useSyncExternalStore(
    // Get the title value only once
    emptySubscribe,
    // On client, get the title value from document.title
    () => document.title,
    // On server, set an empty string because document.title isn't available
    () => '',
  );

  return (
    <div>
      <h1>Client Component Browser APIs</h1>
      <div>
        <h2>document.title</h2>
        <div>{documentTitle}</div>
        {/* <div>{
        // Yields the error `document is not defined`
        document.title}</div>*/}
      </div>
      {/*
      Also yields error `window is not defined`
      <div>
        <h2>window.location.href</h2>
        <div>{window.location.href}</div>
      </div> */}
    </div>
  );
}
