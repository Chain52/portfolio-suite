import z4 from 'zod/v4';
import { DifficultySchema } from '@sudoku-backend/common/schema';

export const CreateGameSchema = z4.strictObject({
  gridScale: z4.number().int().min(1).max(99).default(9),
  difficulty: DifficultySchema
});
export type CreateGameRequestBody = z4.infer<typeof CreateGameSchema>;
