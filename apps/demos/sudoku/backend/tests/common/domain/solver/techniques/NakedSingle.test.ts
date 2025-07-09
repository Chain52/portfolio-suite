import { gridMocks } from '@sudoku-backend-tests/mocks';
import {
  type Technique,
  Grid,
  NakedSingle,
  SolutionTracer
} from '@sudoku-backend/common/domain';
import { Difficulty } from '@sudoku-backend/common/schema';

describe('NakedSingle Technique Impl', () => {
  let technique: Technique;
  let grid: Grid;
  let tracer: SolutionTracer;

  beforeEach(() => {
    technique = new NakedSingle();
  });

  describe('Initialization', () => {
    it('should be able to initialize', () => {
      expect(new NakedSingle()).toBeInstanceOf(NakedSingle);
    });
  });

  describe('Properties', () => {
    describe('Fields', () => {
      // XXX: will remove if isApplicable is added
      it('should not have any public fields', () => {
        const descriptors = Object.getOwnPropertyDescriptors(
          NakedSingle.prototype
        );
        const hasNoPublicFields = Object.values(descriptors).every(
          (descriptor) =>
            typeof descriptor.value === 'function' &&
            !(descriptor.get || descriptor.set)
        );
        expect(hasNoPublicFields).toBe(true);
      });
    });

    describe('Methods', () => {
      describe('apply', () => {
        describe('Standard Behaviors', () => {
          beforeEach(() => {
            tracer = SolutionTracer.createTracer(
              Difficulty.Easy,
              gridMocks.emptyGrid()
            );
          });

          it('should return undefined', () => {
            expect(typeof technique.apply(tracer)).toBeUndefined();
          });

          it("should update the tracer's attempted techniques count", () => {
            technique.apply(tracer);
            expect(tracer.currentStep.techniquesAttempted).toBe(1);
          });
        });

        describe('State Dependent Behaviors', () => {
          let tracer: SolutionTracer;

          describe.each(
            Object.keys(gridMocks.nakedSingle.positive).map((constraint) => [
              constraint as keyof typeof gridMocks.nakedSingle.positive
            ])
          )('given a %s-based constraint', (constraint) => {
            const mock = gridMocks.nakedSingle.positive[constraint];
            beforeEach(() => {
              grid = mock.grid();
              tracer = SolutionTracer.createTracer(Difficulty.Easy, grid);
              technique.apply(tracer);
            });

            it('should solve the available deduction', () => {
              expect(grid.getCellNumber(mock.expected.coordinates)).toBe(
                mock.expected.value
              );
            });
          });

          describe.each(
            Object.keys(gridMocks.nakedSingle.negative).map((constraint) => [
              constraint as keyof typeof gridMocks.nakedSingle.negative
            ])
          )('given a %s-based constraint', (constraint) => {
            const mock = gridMocks.nakedSingle.negative[constraint];
            beforeEach(() => {
              grid = mock.grid();
              tracer = SolutionTracer.createTracer(Difficulty.Easy, grid);
              technique.apply(tracer);
            });

            it('should not make any changes', () => {
              expect(grid.toJSON()).toBe(tracer.puzzle.toJSON());
            });
          });
        });
      });
    });
  });
});
