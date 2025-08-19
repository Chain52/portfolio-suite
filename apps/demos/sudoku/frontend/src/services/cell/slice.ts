import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '@sudoku-frontend/store';
import { createGameSuccess, prepareCreateGame, restartGame } from '../game';

export interface Cell {
  id: number;
  value: number | undefined;
  isSelected: boolean;
  isGiven: boolean;
}

const cellsAdapter = createEntityAdapter<Cell>();

const cellsSlice = createSlice({
  name: 'cells',
  initialState: cellsAdapter.getInitialState(),
  reducers: {
    toggleSelectCell: (state, action: PayloadAction<number>) =>
      cellsAdapter.updateOne(state, {
        id: action.payload,
        changes: { isSelected: !state.entities[action.payload].isSelected }
      })
  },
  extraReducers: (builder) => {
    builder
      .addCase(prepareCreateGame, (state) => {
        cellsAdapter.removeAll(state);
      })
      .addCase(createGameSuccess, (state, action) => {
        cellsAdapter.addMany(
          state,
          action.payload.grid.cells.map((value, i) => ({
            id: i + 1,
            value,
            isSelected: false,
            isGiven: !!value
          }))
        );
      })
      .addCase(restartGame, (state) => {
        cellsAdapter.updateMany(
          state,
          state.ids
            .filter((id) => !state.entities[id].isGiven)
            .map((id) => ({
              id,
              changes: { value: undefined, isSelected: false }
            }))
        );
      });
  }
});

export const { toggleSelectCell } = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;
export const cellsSelectors = cellsAdapter.getSelectors<RootState>(
  (state) => state[cellsSlice.name]
);
