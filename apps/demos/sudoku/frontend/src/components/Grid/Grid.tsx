import React from 'react';

import { useGrid } from '@sudoku-frontend/services';
import { Flex } from '@portfolio/ui';

import Block from './Block';
import { Cell } from '../Cell';

export default function Grid() {
  const { scale, blockScale } = useGrid();

  const looper = new Array<boolean>(scale).fill(true);

  return (
    <Flex
      flex={2}
      justify={{ base: 'center', lg: 'end' }}
      className="h-full w-full p-2"
    >
      <div
        style={{ gridTemplateColumns: `repeat(${scale}, minmax(0, 1fr))` }}
        className="grid border-2 border-black max-w-[90vh] grow"
      >
        {looper.map((_, i) => (
          <Block key={`block-${i + 1}`} scale={blockScale}>
            {looper.map((_, j) => {
              // get band and stack of block
              const blockBand = Math.floor(i / blockScale);
              const blockStack = i % blockScale;

              // get row and col of cell in block sub-grid
              const cellBlockRow = Math.floor(j / blockScale);
              const cellBlockCol = j % blockScale;

              // multiply band/stack by rows/cols in block and add the cell sub-grid amount
              const cellRow = blockBand * blockScale + cellBlockRow;
              const cellCol = blockStack * blockScale + cellBlockCol;

              // multiply row by rows in grid and add col + 1 to get id
              const cellId = cellRow * scale + cellCol + 1;

              return <Cell key={`cell-${cellId}`} id={cellId} />;
            })}
          </Block>
        ))}
      </div>
    </Flex>
  );
}
