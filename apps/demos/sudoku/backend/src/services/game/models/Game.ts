import { Grid } from '@sudoku-backend/common/domain';

export default class Game {
  private solutionId: string = '';
  private grid: Grid;
  private difficulty: string;

  constructor(gridScale: number, difficulty: string) {
    this.grid = new Grid(gridScale);
    this.difficulty = difficulty;
  }

  public static create(gridScale: number, difficulty: string): Game {
    return new Game(gridScale, difficulty);
  }

  public generatePuzzle(): Game {
    return this;
  }

  public toJSON(): object {
    return {
      grid: this.grid.toJSON(),
      difficulty: this.difficulty,
      solveEndpoint: `/api/game/solve/${this.solutionId}`
    };
  }
}
