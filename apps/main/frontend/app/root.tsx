import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'react-router';

import { Navbar, Flex } from '~/components';

import type { Route } from './+types/root';
import tailwindcss from './app.css?url';

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindcss },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/android-chrome-192x192.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '512x512',
    href: '/android-chrome-512x512.png'
  },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png'
  },
  { rel: 'manifest', href: '/site.webmanifest' }
];
const ROOT_TITLE = 'Colin Hain | Portfolio';

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="scroll-smooth">
      <head>
        <title>{ROOT_TITLE}</title>
        <meta property="og:title" content={ROOT_TITLE} />
        <meta
          name="description"
          content="Development portfolio for Colin Hain"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Flex className="min-h-screen">
      <Navbar />
      <Outlet />
    </Flex>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
