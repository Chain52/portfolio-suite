import { createAction } from '@reduxjs/toolkit';
import { Game } from './slice';

export const prepareCreateGame = createAction('game/create/prepare');
export const loadGame = createAction('game/create/load');
export const createGameSuccess = createAction<Game>('game/create/success');
export const createGameError = createAction<Error>('game/create/error');
export const restartGame = createAction('game/restart');
