import { Difficulty } from '@sudoku-backend/common/schema';
import { Grid } from '@sudoku-backend/common/domain';

export default class SolutionTracer {
  #difficulty: Difficulty;
  #puzzle: unknown; // FrozenGrid
  #grid: Grid;

  constructor(difficulty: Difficulty, grid: Grid) {
    this.#difficulty = difficulty;
    this.#grid = grid;
    // this.#puzzle = grid.toFrozenGrid();
  }

  static createTracer(difficulty: Difficulty, grid: Grid): SolutionTracer {
    return new SolutionTracer(difficulty, grid);
  }

  get puzzle() {
    return this.#puzzle;
  }

  get isSolved() {
    return this.#grid.isSolved;
  }

  get solution(): unknown[] /* Solution */ {
    return [];
  }

  get currentStep(): unknown /* SolutionStep */ {
    if (this.solution.length > 0) {
      const potential = this.solution.slice(-1)[0];
      if (!potential.technique) {
        return potential;
      }
    }
    return {
      techniquesAttempted: 0
    };
  }
}
