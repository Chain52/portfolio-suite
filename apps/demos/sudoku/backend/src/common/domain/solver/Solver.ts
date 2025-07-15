import { Difficulty } from '../../schema';

import TechniqueFactory from './TechniqueFactory';
import type {
  Solution,
  SolutionTrace,
  Technique,
  TechniqueApplicationResult
} from './types';
import { Grid } from '../grid';

type HistoryEnabledSolutionTrace = [SolutionTrace | undefined, SolutionTrace];

export default class Solver {
  static #constructorKey = Symbol('disable public constructor');

  #grid: Grid;
  #puzzle: object; // FrozenGrid
  #techniques: Technique[];
  #trace: HistoryEnabledSolutionTrace;
  #solution: Solution;

  constructor(constructorKey: Symbol, grid: Grid, techniques: Technique[]) {
    if (constructorKey !== Solver.#constructorKey) {
      throw new Error(
        'Solver is not constructable directly. Use Solver.createSolver() instead.'
      );
    }
    this.#puzzle = {}; // TODO: get a FrozenGrid
    this.#grid = grid;
    this.#techniques = techniques;

    this.#trace = [undefined, Solver.#createTrace()];
    this.#solution = [];
  }

  /**
   *
   * @param difficulty The difficulty of the puzzle
   * @param grid model of the puzzle
   * @returns Solver
   */
  static createSolver(difficulty: Difficulty, grid: Grid): Solver {
    // TODO: check for empty grid;
    if (true) {
      return new Solver(
        this.#constructorKey,
        grid,
        TechniqueFactory.getAllTechniques()
      );
    }
    return new Solver(
      this.#constructorKey,
      grid,
      TechniqueFactory.getTechniques(difficulty)
    );
  }

  static #createTrace(): SolutionTrace {
    return {
      techniques: [],
      get count() {
        return this.techniques.length;
      }
    };
  }

  get isSolved(): boolean {
    return false;
  }

  get solution(): Solution {
    return this.#solution;
  }

  get currentSolutionStepTrace(): SolutionTrace {
    return this.#trace[1];
  }

  // Exposed for testing
  get lastSolutionStepTrace(): SolutionTrace {
    if (this.#trace[0]) {
      return this.#trace[0];
    }
    throw new Error(
      'attempted to get the previous trace without ever completing a trace.'
    );
  }

  solve(): Solution {
    if (this.isSolved) return this.solution;
    return this.#applyTechniques();
  }

  #applyTechniques(): Solution {
    const initialMutationCount = this.solution.length;

    for (const technique of this.#techniques) {
      if (this.isSolved) break;
      this.#applyTechnique(technique);
    }

    // if the puzzle isn't solved but mutations were made -> retry the techniques
    if (!this.isSolved && this.solution.length > initialMutationCount) {
      return this.#applyTechniques();
    }
    return this.solution;
  }

  #applyTechnique(technique: Technique): void {
    const result = technique.apply(this.#grid);

    this.#updateTrace(result);
    // if the technique was applied -> retry the technique
    if (!this.isSolved && result.mutation) this.#applyTechnique(technique);
  }

  #updateTrace(application: TechniqueApplicationResult) {
    this.currentSolutionStepTrace.techniques.push(application.technique);

    if (application.mutation) {
      this.#trace = [this.currentSolutionStepTrace, Solver.#createTrace()];
      this.#solution.push(application);
    }
  }
}
