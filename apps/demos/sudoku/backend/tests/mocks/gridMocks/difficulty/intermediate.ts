import { Grid } from '@sudoku-backend/common/domain';

export default {
  solvable: {
    /**
     * ┏━━━┯━━━┯━━━┳━━━┯━━━┯━━━┳━━━┯━━━┯━━━┓
     * ┃ 6 │   │ 8 ┃   │ 2 │ 3 ┃   │ 7 │   ┃
     * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
     * ┃ 7 │ 4 │ 3 ┃   │ 8 │ 9 ┃   │   │   ┃
     * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
     * ┃   │   │   ┃ 7 │ 4 │   ┃   │ 3 │ 8 ┃
     * ┣━━━┿━━━┿━━━╋━━━┿━━━┿━━━╋━━━┿━━━┿━━━┫
     * ┃ 5 │ 8 │   ┃ 4 │ 7 │ 2 ┃   │   │ 3 ┃
     * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
     * ┃ 3 │   │ 4 ┃ 9 │ 5 │   ┃   │ 8 │   ┃
     * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
     * ┃   │ 7 │   ┃   │ 3 │ 8 ┃   │   │   ┃
     * ┣━━━┿━━━┿━━━╋━━━┿━━━┿━━━╋━━━┿━━━┿━━━┫
     * ┃   │ 3 │   ┃ 2 │ 6 │ 5 ┃   │ 9 │   ┃
     * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
     * ┃   │   │ 5 ┃ 3 │ 9 │   ┃   │   │ 6 ┃
     * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
     * ┃ 9 │ 6 │   ┃ 8 │ 1 │   ┃ 3 │   │ 5 ┃
     * ┗━━━┷━━━┷━━━┻━━━┷━━━┷━━━┻━━━┷━━━┷━━━┛
     */
    minimal: {
      grid: () =>
        Grid.from(
          '6,,8,,2,3,,7,,' +
            '7,4,3,,8,9,,,,' +
            ',,,7,4,,,3,8,' +
            '5,8,,4,7,2,,,3,' +
            '3,,4,9,5,,,8,,' +
            ',7,,,3,8,,,,' +
            ',3,,2,6,5,,9,,' +
            ',,5,3,9,,,,6,' +
            '9,6,,8,1,,3,,5'
        )
    },
    complex: {
      /**
       * ┏━━━┯━━━┯━━━┳━━━┯━━━┯━━━┳━━━┯━━━┯━━━┓
       * ┃   │   │   ┃   │   │   ┃   │   │   ┃
       * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
       * ┃   │   │   ┃   │   │   ┃   │   │   ┃
       * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
       * ┃   │   │   ┃   │   │   ┃   │   │   ┃
       * ┣━━━┿━━━┿━━━╋━━━┿━━━┿━━━╋━━━┿━━━┿━━━┫
       * ┃   │   │   ┃   │   │   ┃   │   │   ┃
       * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
       * ┃   │   │   ┃   │   │   ┃   │   │   ┃
       * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
       * ┃   │   │   ┃   │   │   ┃   │   │   ┃
       * ┣━━━┿━━━┿━━━╋━━━┿━━━┿━━━╋━━━┿━━━┿━━━┫
       * ┃   │   │   ┃   │   │   ┃   │   │   ┃
       * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
       * ┃   │   │   ┃   │   │   ┃   │   │   ┃
       * ┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
       * ┃   │   │   ┃   │   │   ┃   │   │   ┃
       * ┗━━━┷━━━┷━━━┻━━━┷━━━┷━━━┻━━━┷━━━┷━━━┛
       */
      grid: () =>
        Grid.from(
          ',,,,,,,,,' +
            ',,,,,,,,,' +
            ',,,,,,,,,' +
            ',,,,,,,,,' +
            ',,,,,,,,,' +
            ',,,,,,,,,' +
            ',,,,,,,,,' +
            ',,,,,,,,,' +
            ',,,,,,,,'
        )
    }
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
