import { Grid, Coordinates } from '@sudoku-backend/common/domain';

const TEST_GRID_SCALE = 4;
const AVAILABLE_NUMBERS = Array.from(
  { length: TEST_GRID_SCALE },
  (_, i) => i + 1
);

const INVALID_COORDINATES = [
  [[0], 'invalid coordinate length'],
  [['0', 0], 'invalid row type'],
  [[0, '0'], 'invalid column type'],
  [[-1, 0], 'negative row index'],
  [[0, -1], 'negative column index'],
  [[TEST_GRID_SCALE, 0], 'row index out of range'],
  [[0, TEST_GRID_SCALE], 'column index out of range']
] as unknown as Array<[Coordinates, string]>;

describe('Grid Domain Model', () => {
  let grid: Grid;

  beforeEach(() => {
    grid = new Grid(TEST_GRID_SCALE);
  });

  describe('Initialization', () => {
    it('should be able to initialize', () => {
      expect(grid).toBeInstanceOf(Grid);
    });
  });

  describe('Fields', () => {
    describe('scale', () => {
      it('should be present', () => {
        expect(grid).toHaveProperty('scale');
      });

      it('should return a number', () => {
        expect(typeof grid.scale).toBe('number');
      });

      it('should return the same scale as given in initialization', () => {
        expect(grid.scale).toBe(TEST_GRID_SCALE);
      });
    })

    describe('size', () => {
      it('should be present', () => {
        expect(grid).toHaveProperty('size');
      });

      it('should return a number', () => {
        expect(typeof grid.size).toBe('number');
      });

      it('should return the amount of cells in the grid', () => {
        expect(grid.size).toBe(TEST_GRID_SCALE * TEST_GRID_SCALE);
      });
    });

    describe('blockScale', () => {
      it('should be present', () => {
        expect(grid).toHaveProperty('blockScale');
      });

      it('should return a number', () => {
        expect(typeof grid.blockScale).toBe('number');
      });

      it('should return the scale of individual blocks in the puzzle if present', () => {
        expect(grid.blockScale).toBe(2);
      });

      it('should return 0 if blocks are not present', () => {
        grid = new Grid(3);
        expect(grid.blockScale).toBe(0);
      });
    })
  });

  describe('Methods', () => {
    describe('getCellNumber', () => {
      it('should be present', () => {
        expect(grid).toHaveProperty('getCellNumber');
      });

      it('should return undefined for a not numbered cell', () => {
        expect(grid.getCellNumber(0)).toBeUndefined();
      });

      it('should return the number for a numbered cell', () => {
        grid.setCellNumber(0, 1);
        expect(grid.getCellNumber(0)).toBe(1);
      });
    });

    describe('getBlockIndex', () => {
      it('should be present', () => {
        expect(grid).toHaveProperty('getBlockIndex');
      });

      it('should return -1 if the grid does not have blocks', () => {
        grid = new Grid(3);
        expect(grid.getBlockIndex(0)).toBe(-1);
      });

      it('should return the index the block for a given cell location', () => {
        expect(grid.getBlockIndex(0)).toBe(0);
      });
    })

    describe('getCellCandidates', () => {
      it('should be present', () => {
        expect(grid).toHaveProperty('getCellCandidates');
      });

      it('should retrieve candidates at coordinates', () => {
        expect(grid.getCellCandidates([0, 0])).toEqual(AVAILABLE_NUMBERS);
      });

      it('should repoll candidates on stale column', () => {
        grid.setCellNumber([0, 1], 1);
        expect(grid.getCellCandidates([0, 0])).toEqual(
          AVAILABLE_NUMBERS.slice(1)
        );
      });

      it('should repoll candidates on stale row', () => {
        grid.setCellNumber([1, 0], 1);
        expect(grid.getCellCandidates([0, 0])).toEqual(
          AVAILABLE_NUMBERS.slice(1)
        );
      });

      it('should repoll candidates on stale block', () => {
        grid.setCellNumber([1, 1], 1);
        expect(grid.getCellCandidates([0, 0])).toEqual(
          AVAILABLE_NUMBERS.slice(1)
        );
      });

      describe('given invalid arguments', () => {
        test.each(INVALID_COORDINATES)(
          'coordinates %p: should throw an error for %s',
          (coords, _) => {
            expect(() => grid.getCellCandidates(coords)).toThrow();
          }
        );
      });
    });

    describe('setCellNumber', () => {
      // TODO: Import error messages from a common file.
      describe('given invalid arguments', () => {
        test.each([
          [[0], 1, 'invalid coordinate length'],
          [['0', 0], 1, 'invalid row type'],
          [[0, '0'], 1, 'invalid column type'],
          [[-1, 0], 1, 'negative row index'],
          [[0, -1], 1, 'negative column index'],
          [[TEST_GRID_SCALE, 0], 1, 'row index out of range'],
          [[0, TEST_GRID_SCALE], 1, 'column index out of range'],
          [[0, 0], TEST_GRID_SCALE + 1, 'cell number out of range']
        ] as unknown as Array<[Coordinates, number, string]>)(
          'coordinates %p and value %d: should throw an error for %s',
          (coordinates, value) => {
            expect(() => grid.setCellNumber(coordinates, value)).toThrow();
          }
        );
      });

      describe('given valid arguments', () => {
        it('should set a cell number', () => {
          const coordinates: Coordinates = [0, 0];
          const value = 1;
          grid.setCellNumber(coordinates, value);
          expect(grid.getCellNumber(coordinates)).toBe(value);
        });

        it('should update an existing cell number', () => {
          const coordinates: Coordinates = [0, 0];

          const initialValue = 1;
          grid.setCellNumber(coordinates, initialValue);

          const updatedValue = 2;
          grid.setCellNumber(coordinates, updatedValue);

          expect(grid.getCellNumber(coordinates)).toBe(updatedValue);
        });
      });
    });
  });
});
