import type { Request, Response } from 'express';
import type { CreateGameRequestBody } from '../schema';

export default function createGame(
  req: Request<unknown, unknown, CreateGameRequestBody>,
  res: Response
) {
  const { difficulty, gridScale } = req.body;

  // Generate a new Game
  res.status(201).json({
    difficulty,
    grid: {
      scale: gridScale,
      cells: []
    }
  });
}
