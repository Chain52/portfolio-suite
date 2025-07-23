import { gridMocks } from '@sudoku-backend-tests/mocks';
import { Grid, Solver, TechniqueFactory } from '@sudoku-backend/common/domain';
import { Difficulty } from '@sudoku-backend/common/schema';

describe('Solver Domain Model', () => {
  let grid: Grid;
  let solver: Solver;

  beforeEach(() => {
    grid = gridMocks.emptyGrid();
    solver = Solver.createSolver(Difficulty.Easy, grid);
  });

  describe('Initialization', () => {
    it('should initialize through factory creation', () => {
      expect(solver).toBeInstanceOf(Solver);
    });
  });

  describe('Properties', () => {
    describe('Fields', () => {
      describe('isSolved', () => {
        it('should return a boolean', () => {
          expect(typeof solver.isSolved).toBe('boolean');
        });
      });

      describe('solution', () => {
        it('should return a Solution list', () => {
          expect(Array.isArray(solver.solution)).toBe(true);
        });
      });
    });

    describe('Methods', () => {
      describe('solve', () => {
        it('should return a Solution', () => {
          expect(solver.solve()).toEqual([]);
        });

        describe('given an empty grid', () => {
          beforeEach(() => {
            solver.solve();
          });

          it('should attempt all techniques', () => {
            expect(solver.currentSolutionStepTrace.count).toBe(
              TechniqueFactory.getTechniques().length
            );
          });

          it('should not solve an empty grid', () => {
            expect(solver.isSolved).toBe(false);
          });

          it('should not succeed in placing a number in an empty grid', () => {
            expect(solver.solution.length).toBe(0);
          });
        });

        it('should short circuit once the puzzle is solved', () => {
          const mock = gridMocks.difficulty.beginner.solvable.minimal;
          solver = Solver.createSolver(Difficulty.Easy, mock.grid());
          solver.solve();
          expect(solver.lastSolutionStepTrace.count).toBe(mock.stepsToSolve);
        });

        it('should only solve puzzles within its difficulty', () => {
          const mock = gridMocks.difficulty.intermediate.solvable.minimal;
          solver = Solver.createSolver(Difficulty.Easy, mock.grid());
          solver.solve();
          expect(solver.isSolved).toBe(false);
        });

        describe.each(
          Object.keys(gridMocks.difficulty.beginner.solvable).map(
            (constraint) => [
              constraint as keyof typeof gridMocks.difficulty.beginner.solvable
            ]
          )
        )('given a %s solvable grid', (constraint) => {
          const mock = gridMocks.difficulty.beginner.solvable[constraint];

          beforeEach(() => {
            solver = Solver.createSolver(Difficulty.Easy, mock.grid());
            solver.solve();
          });

          it('should solve the grid', () => {
            expect(solver.isSolved).toBe(true);
          });

          it('should return identical solutions', () => {
            const secondSolution = Solver.createSolver(
              Difficulty.Easy,
              mock.grid()
            ).solve();
            expect(solver.solution).toEqual(secondSolution);
          });
        });
      });
    });
  });
});
