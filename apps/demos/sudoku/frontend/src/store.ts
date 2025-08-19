import { configureStore } from '@reduxjs/toolkit';

import { api, gridReducer, cellsReducer, selectionReducer } from './services';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    grid: gridReducer,
    cells: cellsReducer,
    selection: selectionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
