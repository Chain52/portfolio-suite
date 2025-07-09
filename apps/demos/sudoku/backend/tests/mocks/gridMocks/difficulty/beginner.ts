import { Grid } from '@sudoku-backend/common/domain';

export default {
  solvable: {
    default: { grid: () => Grid.from('1,2,2,'), stepsToSolve: 1 }
  },
  unsolvable: {
    /*
     * ┏━━━┯━━━┯━━━┓
     * ┃ 1 │   │   ┃
     * ┠───┼───┼───┨
     * ┃   │   │   ┃
     * ┠───┼───┼───┨
     * ┃   │   │   ┃
     * ┗━━━┷━━━┷━━━┛
     */
    unconstrained: () => Grid.from('1,,,,,,,,')
  }
};
