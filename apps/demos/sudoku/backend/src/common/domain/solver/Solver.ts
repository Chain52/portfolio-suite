import { Difficulty } from '../../schema';

import SolutionTracer from './SolutionTracer';
import TechniqueFactory from './TechniqueFactory';
import { Technique } from './types';
import { Grid } from '../grid';

export default class Solver {
  static #constructorKey = Symbol('disable public constructor');

  #solutionTracer: SolutionTracer;
  #techniques: Technique[];

  constructor(
    constructorKey: Symbol,
    solutionTracer: SolutionTracer,
    techniques: Technique[]
  ) {
    if (constructorKey !== Solver.#constructorKey) {
      throw new Error(
        'Solver is not constructable directly. Use Solver.create[SolverType]() instead.'
      );
    }
    this.#solutionTracer = solutionTracer;
    this.#techniques = techniques;
  }

  static createGenerationSolver(difficulty: Difficulty, grid: Grid): Solver {
    return new Solver(
      this.#constructorKey,
      SolutionTracer.createGenerationTracer(difficulty),
      TechniqueFactory.getTechniques()
    );
  }

  solve() {
    if (this.#solutionTracer.isSolved) return true;
    return this.#applyTechniques();
  }

  #applyTechniques(): boolean {
    const initialMoveCount = this.#solutionTracer.solutionMoveCount;

    for (const technique of this.#techniques) {
      technique.apply(this.#solutionTracer);
    }

    if (
      !this.#solutionTracer.isSolved &&
      this.#solutionTracer.solutionMoveCount > initialMoveCount
    ) {
      return this.#applyTechniques();
    }
    return this.#solutionTracer.isSolved;
  }
}
