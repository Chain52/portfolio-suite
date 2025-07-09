import { Grid } from '@sudoku-backend/common/domain';

export default {
  positive: {
    row: {
      grid: () => Grid.from('1,,3,2,3,1,3,1,2'),
      expected: {
        coordinates: [1, 0],
        value: 2
      }
    },
    column: {
      grid: () => Grid.from('1,2,3,,3,1,3,1,2'),
      expected: {
        coordinates: [0, 1],
        value: 2
      }
    },
    box: {
      grid: () => Grid.from('1,2,3,4,4,3,,1,2,1,4,3,3,4,1,2'),
      expected: {
        coordinates: [2, 1],
        value: 2
      }
    },
    mix: {
      grid: () => Grid.from(',,,4,3,,,,,,,,,,2,'),
      expected: {
        coordinates: [2, 1],
        value: 1
      }
    }
  },
  negative: {
    none: {
      grid: () => Grid.from('1,,,4,,4,1,,,2,4,,4,,,2')
    }
  }
};
