import z4 from 'zod/v4';

export const Difficulty = Object.freeze({
  Easy: 'beginner',
  Medium: 'intermediate',
  Hard: 'advanced',
  Extreme: 'expert'
});

export const DifficultySchema = z4.enum(Difficulty).default(Difficulty.Easy);
export type Difficulty = z4.infer<typeof DifficultySchema>;
