import express from 'express';
import { validateRequest } from '@sudoku-backend/common/middleware';

import { createGame } from './handlers';
import { CreateGameSchema } from './schema';

const router = express.Router();

router.post('/', validateRequest(CreateGameSchema), createGame);

export default router;
