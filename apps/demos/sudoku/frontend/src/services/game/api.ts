import { api } from '../api';
import { Game } from './slice';

interface GameRequest {
  gridScale: number;
  difficulty: 'easy'; // TODO: pull in schema stuff from backend
}

export const gameApi = api.injectEndpoints({
  endpoints: (build) => ({
    createGame: build.mutation<Game, GameRequest>({
      query: (req) => ({
        url: 'game',
        method: 'POST',
        body: req
      })
    })
  })
});
