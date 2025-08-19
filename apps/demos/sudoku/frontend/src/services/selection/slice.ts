import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number[] = [];

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    selectOne: (_, action: PayloadAction<number>) => [action.payload],
    selectMany: (state, action: PayloadAction<number[]>) => {
      if (state.length > 0) {
        action.payload.forEach((id) => state.push(id));
      }
      state = action.payload;
    },
    toggleSelect: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.includes(id)) {
        state = state.filter((selection) => selection !== id);
      } else {
        state.push(id);
      }
    },
    clearSelection: () => []
  }
});

export const { selectOne, selectMany, toggleSelect, clearSelection } =
  selectionSlice.actions;
export const selectionReducer = selectionSlice.reducer;
