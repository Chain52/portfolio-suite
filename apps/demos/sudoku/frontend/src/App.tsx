import React from 'react';

import { Game } from './components/index.js';
import { Flex } from '@portfolio/ui';

export default function App() {
  return (
    <Flex as="main" grow justify="center">
      <Flex direction="col" grow className="max-w-7xl gap-24 px-8 py-24">
        <Flex justify="center">
          <h1 className="text-4xl font-medium">Sudoku</h1>
        </Flex>
        <Game />
      </Flex>
    </Flex>
  );
}
