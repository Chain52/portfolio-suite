import { serverlessApp } from '@sudoku-backend/common/apps';

import router from './router';

export const gameService = serverlessApp('/api/game', router);
