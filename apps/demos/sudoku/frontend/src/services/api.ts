import { createApi, QueryReturnValue } from '@reduxjs/toolkit/query/react';
import TEST_GAME from '@sudoku-frontend/constants/TEST_GAME';
// import config from '@sudoku-frontend/config';

export const api = createApi({
  // TODO: Connect to API
  // baseQuery: fetchBaseQuery({ baseUrl: config.env.SUDOKU_API_URL }),
  baseQuery: (args, api) => {
    switch (api.endpoint) {
      case 'createGame': {
        return new Promise((resolve) => {
          resolve({ data: TEST_GAME } satisfies QueryReturnValue);
        });
      }
      default:
        throw new Error('Unhanded API endpoint: ' + JSON.stringify(api));
    }
  },
  tagTypes: ['Game'],
  endpoints: () => ({})
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    createGame: () => 'test'
  })
});
