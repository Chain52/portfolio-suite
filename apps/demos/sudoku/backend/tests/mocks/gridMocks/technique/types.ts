import type { Grid, GridMutation } from "@sudoku-backend/common/domain";

export type GridMock = {
  grid: () => Grid;
  expected: GridMutation;
};