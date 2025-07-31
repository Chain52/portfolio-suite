import React from 'react';

import tailwindcss from './app.css?url';
import { Flex } from '@portfolio/ui';

export default function Root({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Sudoku Game" />
        <meta name="description" content="Standalone Sudoku Game" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href={tailwindcss} rel="stylesheet" />
        <title>Sudoku Game</title>
      </head>
      <body>
        <Flex id="root" className="min-h-screen">
          {children}
        </Flex>
        <script type="module" src="/src/entry-client.tsx"></script>
      </body>
    </html>
  );
}
