import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import config from '@sudoku-frontend/config';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: config.env.SUDOKU_API_URL }),
  tagTypes: ['Game'],
  endpoints: () => ({})
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    createGame: () => 'test'
  })
});
