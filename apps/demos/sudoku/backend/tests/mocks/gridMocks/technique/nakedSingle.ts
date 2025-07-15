import { Grid, GridMutation } from '@sudoku-backend/common/domain';

type GridMock = {
  grid: () => Grid;
  expected: GridMutation;
};

export default {
  positive: {
    row: {
      grid: () => Grid.from('1,,3,2,3,1,3,1,2'),
      expected: {
        type: 'number',
        coordinates: [1, 0],
        number: 2
      }
    },
    column: {
      grid: () => Grid.from('1,2,3,,3,1,3,1,2'),
      expected: {
        type: 'number',
        coordinates: [0, 1],
        number: 2
      }
    },
    box: {
      grid: () => Grid.from('1,2,3,4,4,3,,1,2,1,4,3,3,4,1,2'),
      expected: {
        type: 'number',
        coordinates: [2, 1],
        number: 2
      }
    },
    mix: {
      grid: () => Grid.from(',,,4,3,,,,,,,,,,2,'),
      expected: {
        type: 'number',
        coordinates: [2, 1],
        number: 1
      }
    }
  } satisfies Record<string, GridMock>,
  negative: {
    none: {
      grid: () => Grid.from('1,,,4,,4,1,,,2,4,,4,,,2')
    }
  }
};
