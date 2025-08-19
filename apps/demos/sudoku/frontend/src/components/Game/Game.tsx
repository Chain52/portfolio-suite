import React from 'react';
import theme from 'tailwindcss/defaultTheme';

import { Flex, useContainerDimensions } from '@portfolio/ui';
import { LoadStatus } from '@sudoku-frontend/constants';
import { useCreateGameMutation, useGrid } from '@sudoku-frontend/services';

import { Grid } from '../Grid';
import { Controls } from '../Controls';

export default function Game() {
  const { containerRef, dimensions } = useContainerDimensions();
  const { status } = useGrid();

  const [createGame] = useCreateGameMutation();

  const createGameHandler = React.useCallback(() => {
    void createGame({ scale: 9, difficulty: 'easy' });
  }, [createGame]);

  return (
    <Flex
      ref={containerRef}
      direction={{ base: 'col', lg: 'row' }}
      justify="center"
      align="center"
      className="p-4 gap-4 h-dvh overflow-auto"
    >
      {status === LoadStatus.Idle && (
        <button
          onClick={createGameHandler}
          className="bg-gray-300 px-2 py-1 border rounded-lg cursor-pointer hover:bg-gray-200"
        >
          Press to Render Grid
        </button>
      )}
      {status === LoadStatus.Loading && <span>LOADING</span>}
      {status === LoadStatus.Loaded && (
        <>
          <Grid />
          <Controls
            largeViewport={
              dimensions.width + 14 >
              Number.parseInt(theme.screens.lg.replace(/rem|px/g, '')) * 16
            }
          />
        </>
      )}
    </Flex>
  );
}
