// Security: Reject write requests from other websites (CSRF protection)
// to prevent attacks like unwanted account changes or login CSRF
//
// Next.js Route Handlers do not yet have built-in CSRF protection
// - https://github.com/vercel/next.js/discussions/101245

import type { NextRequest } from 'next/server';

export const config = {
  // Route groups like (auth) are omitted from URLs, so this also matches their API routes
  matcher: '/api/:path*',
};

export function proxy(request: NextRequest) {
  const origin = request.headers.get('origin');

  // Allow safe methods and non-browser clients without Origin
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method) || origin === null) {
    return;
  }

  if (
    !URL.canParse(origin) ||
    new URL(origin).host !==
      (request.headers.get('x-forwarded-host') || request.headers.get('host'))
  ) {
    return new Response('Cross-site request forbidden', { status: 403 });
  }
}
