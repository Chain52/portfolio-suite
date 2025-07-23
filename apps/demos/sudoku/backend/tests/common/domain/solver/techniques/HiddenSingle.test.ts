import { gridMocks } from '@sudoku-backend-tests/mocks';
import {
  type Technique,
  CellMutation,
  Grid,
  GridMutation,
  HiddenSingle
} from '@sudoku-backend/common/domain';
import { GridMutationType } from '@sudoku-backend/common/schema';

describe('HiddenSingle Technique Impl', () => {
  let technique: Technique;
  let grid: Grid;
  let mutation: CellMutation;
  let negativeMutation: GridMutation | undefined;

  beforeEach(() => {
    technique = new HiddenSingle();
  });

  describe('Initialization', () => {
    it('should be able to initialize', () => {
      expect(technique).toBeInstanceOf(HiddenSingle);
    });
  });

  describe('Properties', () => {
    describe('Methods', () => {
      describe('apply', () => {
        describe.each(
          Object.keys(gridMocks.hiddenSingle.positive).map((constraint) => [
            constraint as keyof typeof gridMocks.hiddenSingle.positive
          ])
        )('given a %s-based constraint', (constraint) => {
          const mock = gridMocks.hiddenSingle.positive[constraint];
          beforeEach(() => {
            grid = mock.grid();
            const tempMutation = technique.apply(grid).mutation;
            if (tempMutation && tempMutation.type === GridMutationType.Number) {
              mutation = tempMutation;
            }
          });

          it('should solve the available deduction', () => {
            expect(grid.getCellNumber(mutation.coordinates)).toBe(
              mock.expected.number
            );
          });

          it('should return the mutation', () => {
            expect(mutation).toEqual<GridMutation>(mock.expected);
          });
        });

        describe.each(
          Object.keys(gridMocks.hiddenSingle.negative).map((constraint) => [
            constraint as keyof typeof gridMocks.hiddenSingle.negative
          ])
        )('given a %s-based constraint', (constraint) => {
          const mock = gridMocks.hiddenSingle.negative[constraint];
          beforeEach(() => {
            grid = mock.grid();
            negativeMutation = technique.apply(grid).mutation;
          });

          it('should not make any changes', () => {
            expect(negativeMutation).toBeUndefined();
          });
        });
      });
    });
  });
});
