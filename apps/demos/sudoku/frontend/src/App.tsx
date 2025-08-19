import React from 'react';

import { Game } from './components/index.js';
import { Flex } from '@portfolio/ui';
import tailwindcss from './app.css?url';

export default function App() {
  return (
    <>
      <link href={tailwindcss} rel="stylesheet" />
      <Flex as="main" direction="col" className="h-full overflow-hidden">
        <Flex justify="center" className="w-full overflow-hidden">
          <Flex
            direction="col"
            grow
            className="max-w-7xl gap-8 overflow-hidden"
          >
            <Flex justify="center">
              <h1 className="text-4xl font-medium">Sudoku</h1>
            </Flex>
            <Game />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
