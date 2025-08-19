import { createSlice } from '@reduxjs/toolkit';

import { LoadStatus } from '@sudoku-frontend/constants';
import { createGameSuccess, loadGame, prepareCreateGame } from '../game';

export interface Grid {
  status: LoadStatus;
  scale: number;
  hasBlocks: boolean;
  blockScale: number;
}

const initialState: Grid = {
  status: LoadStatus.Idle,
  scale: 0,
  hasBlocks: false,
  blockScale: 0
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(prepareCreateGame, () => initialState)
      .addCase(loadGame, (state) => {
        state.status = LoadStatus.Loading;
      })
      .addCase(createGameSuccess, (state, action) => {
        const {
          grid: { scale, blockConfig }
        } = action.payload;

        state.scale = scale;
        state.hasBlocks = blockConfig.hasBlocks;
        state.blockScale = blockConfig.scale;
        state.status = LoadStatus.Loaded;
      });
  }
});

export const {} = gridSlice.actions;
export const gridReducer = gridSlice.reducer;
