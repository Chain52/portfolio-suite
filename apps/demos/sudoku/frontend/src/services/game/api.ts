import { api } from '../api';
import {
  createGameError,
  createGameSuccess,
  loadGame,
  prepareCreateGame
} from './actions';
import { Game } from './slice';

export interface GameRequest {
  scale: number;
  difficulty: 'easy'; // TODO: pull in schema stuff from backend
}

export const gameApi = api.injectEndpoints({
  endpoints: (build) => ({
    createGame: build.mutation<Game, GameRequest>({
      query: (req) => ({
        url: 'game',
        method: 'POST',
        body: req
      }),
      invalidatesTags: ['Game'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(prepareCreateGame());
        // XXX: Temporary
        dispatch(loadGame());
        const { data } = await queryFulfilled;
        console.log('simulating loading');
        setTimeout(() => {
          try {
            dispatch(createGameSuccess(data));
          } catch (err) {
            dispatch(createGameError(err as Error));
          }
        }, 2000);
      }
    })
  })
});

export const { useCreateGameMutation } = gameApi;
