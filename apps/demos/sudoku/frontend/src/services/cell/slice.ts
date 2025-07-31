import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export interface Cell {
  id: number;
  value: number;
}

const cellEntity = createEntityAdapter<Cell>();

const cellSlice = createSlice({
  name: 'cell',
  initialState: {
    cells: cellEntity.getInitialState()
  },
  reducers: {}
});

export const {} = cellSlice.actions;
export const cellReducer = cellSlice.reducer;
export const cellSelectors = cellEntity.getSelectors<{
  [cellSlice.name]: ReturnType<typeof cellReducer>;
}>((state) => state[cellSlice.name].cells);
