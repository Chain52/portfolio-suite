import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export interface Game {
  id: number;
  grid: {
    scale: number;
    blockConfig: {
      hasBlocks: boolean;
      shape: 'square';
      scale: number;
    };
    cells: Array<number | undefined>;
  };
}

const gameEntity = createEntityAdapter<Game>();

const gameSlice = createSlice({
  name: 'game',
  initialState: gameEntity.getInitialState(),
  reducers: {}
});

type GameSlice = {
  [gameSlice.name]: ReturnType<(typeof gameSlice)['reducer']>;
};

export const {} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
export const { selectById: getGameById } = gameEntity.getSelectors<GameSlice>(
  (state) => state[gameSlice.name]
);
