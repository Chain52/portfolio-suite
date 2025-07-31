import { createSlice } from '@reduxjs/toolkit';

import { LoadStatus } from '@sudoku-frontend/constants';
import type { Cell } from '../cell';

export interface Grid {
  status: LoadStatus;
  cells: Cell[];
}

const initialState: Grid = {
  status: LoadStatus.Idle,
  cells: []
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {}
});

export const {} = gridSlice.actions;
export const gridReducer = gridSlice.reducer;
