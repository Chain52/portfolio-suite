import { configureStore } from '@reduxjs/toolkit';

import { api, gameReducer, gridReducer } from './services';
import { cellReducer } from './services/cell';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    game: gameReducer,
    grid: gridReducer,
    cell: cellReducer
    // controls: controlReducer,
    // UI: uiReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
