import { gridMocks } from '@sudoku-backend-tests/mocks';
import { Grid, SolutionTracer } from '@sudoku-backend/common/domain';
import { Difficulty } from '@sudoku-backend/common/schema';

describe('SolutionTracer Domain Model', () => {
  let tracer: SolutionTracer;
  let grid: Grid;

  describe('Properties', () => {
    describe('Fields', () => {
      describe('puzzle', () => {
        beforeEach(() => {
          grid = gridMocks.emptyGrid();
          tracer = SolutionTracer.createTracer(Difficulty.Easy, grid);
        });

        it('should return a FrozenGrid', () => {
          expect(tracer.puzzle).toBeInstanceOf(FrozenGrid);
        });
      });

      describe('isSolved', () => {
        it('should return a boolean', () => {
          tracer = SolutionTracer.createTracer(
            Difficulty.Easy,
            gridMocks.emptyGrid()
          );
          expect(typeof tracer.isSolved).toBe('boolean');
        });

        describe('given an unsolved initialization', () => {
          beforeEach(() => {
            tracer = SolutionTracer.createTracer(
              Difficulty.Easy,
              gridMocks.emptyGrid()
            );
          });

          it('should initialize as unsolved', () => {
            expect(tracer.isSolved).toBe(false);
          });
        });

        describe('given a solved initialization', () => {
          beforeEach(() => {
            tracer = SolutionTracer.createTracer(
              Difficulty.Easy,
              gridMocks.solvedGrid()
            );
          });

          it('should initialize as solved', () => {
            expect(tracer.isSolved).toBe(true);
          });
        });
      });

      describe('solution', () => {
        beforeEach(() => {
          tracer = SolutionTracer.createTracer(
            Difficulty.Easy,
            gridMocks.emptyGrid()
          );
        });

        it('should initialize as an empty Solution', () => {
          expect(tracer.solution).toEqual<Solution>([]);
        });
      });

      describe('currentStep', () => {
        beforeEach(() => {
          tracer = SolutionTracer.createTracer(
            Difficulty.Easy,
            gridMocks.emptyGrid()
          );
        });

        it('should return a SolutionStep', () => {
          expect(tracer.currentStep).toEqual<SolutionStep>({
            techniquesAttempted: 0
          });
        });
      });
    });
  });
});
