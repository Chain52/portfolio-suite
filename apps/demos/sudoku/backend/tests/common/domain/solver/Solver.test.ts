import { gridMocks } from '@sudoku-backend-tests/mocks';
import {
  Grid,
  SolutionTracer,
  Solver,
  TechniqueFactory
} from '@sudoku-backend/common/domain';
import { Difficulty } from '@sudoku-backend/common/schema';

describe('Solver Domain Model', () => {
  let grid: Grid;
  let solver: Solver;

  describe('Initialization', () => {
    beforeEach(() => {
      grid = gridMocks.emptyGrid();
      solver = Solver.createSolver(Difficulty.Easy, grid);
    });

    it('should initialize through factory creation', () => {
      expect(solver).toBeInstanceOf(Solver);
    });
  });

  describe('Properties', () => {
    describe('Fields', () => {
      describe('hasSolution', () => {
        it('should return a boolean', () => {
          expect(typeof solver.hasSolution).toBe('boolean');
        });
      });

      describe('solutionTracer', () => {
        it('should return a SolutionTracer', () => {
          expect(solver.solutionTracer).toBeInstanceOf(SolutionTracer);
        });
      });
    });

    describe('Methods', () => {
      describe('solve', () => {
        it('should return undefined', () => {
          expect(solver.solve()).toBeUndefined();
        });

        describe('given an empty grid', () => {
          beforeEach(() => {
            solver.solve();
          });

          it('should attempt all techniques', () => {
            expect(solver.solutionTracer.currentStep.techniquesAttempted).toBe(
              TechniqueFactory.getTechniques().length
            );
          });

          it('should not solve an empty grid', () => {
            expect(solver.solutionTracer.isSolved).toBe(false);
          });

          it('should not succeed in placing a number in an empty grid', () => {
            expect(grid.cellCount).toBe(0);
          });
        });

        describe('given a solvable grid', () => {
          const mock = gridMocks.difficulty.beginner.solvable.default;

          beforeEach(() => {
            solver = Solver.createSolver(Difficulty.Easy, mock.grid());
            solver.solve();
          });

          it('should short circuit once the puzzle is solved', () => {
            expect(solver.solutionTracer.currentStep.techniquesAttempted).toBe(
              mock.stepsToSolve
            );
          });

          it('should solve the grid', () => {
            expect(solver.solutionTracer.isSolved).toBe(true);
          });
        });
      });
    });
  });
});
