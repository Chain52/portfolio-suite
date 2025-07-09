import { Grid, type Coordinates } from '@sudoku-backend/common/domain';

const TEST_GRID_SCALE = 2;

describe('Grid Domain Model', () => {
  let grid: Grid;

  beforeEach(() => {
    grid = new Grid(TEST_GRID_SCALE);
  });

  describe('Initialization', () => {
    it('should be able to initialize', () => {
      expect(grid).toBeInstanceOf(Grid);
    });

    it('should initialize with the given scale', () => {
      expect(grid.toJSON().scale).toBe(TEST_GRID_SCALE);
    });

    it('should not have any cells on initialization', () => {
      expect(grid.toJSON().cells).toEqual([]);
    });
  });

  describe('Fields', () => {
    // XXX: Remove this if the Grid class gets public properties.
    it('should not have any public properties', () => {
      const descriptors = Object.getOwnPropertyDescriptors(Grid.prototype);
      const hasNoPublicFields = Object.values(descriptors).every(
        (descriptor) =>
          typeof descriptor.value === 'function' &&
          !(descriptor.get || descriptor.set)
      );
      expect(hasNoPublicFields).toBe(true);
    });
  });

  describe('Methods', () => {
    describe('toJSON', () => {
      it('should return an object', () => {
        expect(typeof grid.toJSON()).toBe('object');
      });

      describe('scale', () => {
        it('should be present', () => {
          expect(grid.toJSON()).toHaveProperty('scale');
        });

        it('should be a number', () => {
          expect(typeof grid.toJSON().scale).toBe('number');
        });

        it('should be unchanged from initialization', () => {
          expect(grid.toJSON().scale).toBe(TEST_GRID_SCALE);
        });
      });

      describe('cells', () => {
        it('should be present', () => {
          expect(grid.toJSON()).toHaveProperty('cells');
        });

        it('should be an array', () => {
          expect(Array.isArray(grid.toJSON().cells)).toBe(true);
        });

        it('should be empty on initialization', () => {
          expect(grid.toJSON().cells).toEqual([]);
        });
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
        it('should add a new cell if it does not exist', () => {
          const initialCellLength = grid.toJSON().cells.length;
          grid.setCellNumber([0, 0], 1);
          expect(grid.toJSON().cells.length).toBeGreaterThan(initialCellLength);
        });

        it('should set a cell number', () => {
          const coordinates: Coordinates = [0, 0];
          const value = 1;
          grid.setCellNumber(coordinates, value);
          expect(grid.toJSON().cells).toEqual([
            { coordinates, cell: { number: value } }
          ]);
        });

        it('should update an existing cell number', () => {
          const coordinates: Coordinates = [0, 0];

          const initialValue = 1;
          grid.setCellNumber(coordinates, initialValue);

          const updatedValue = 2;
          grid.setCellNumber(coordinates, updatedValue);

          expect(grid.toJSON().cells).toEqual([
            { coordinates, cell: { number: updatedValue } }
          ]);
        });
      });
    });

    describe('removeCell', () => {
      // TODO: Import error messages from a common file.
      describe('given invalid coordinates', () => {
        test.each([
          [[0], 'invalid coordinate length'],
          [['0', 0], 'invalid row type'],
          [[0, '0'], 'invalid column type'],
          [[-1, 0], 'negative row index'],
          [[0, -1], 'negative column index'],
          [[TEST_GRID_SCALE, 0], 'row index out of range'],
          [[0, TEST_GRID_SCALE], 'column index out of range']
        ] as unknown as Array<[Coordinates, string]>)(
          '%p: should throw an error for %s',
          (coordinates) => {
            expect(() => grid.removeCell(coordinates)).toThrow();
          }
        );
      });

      describe('given valid coordinates', () => {
        it('should remove the cell if it exists', () => {
          const coordinates: Coordinates = [0, 0];
          grid.setCellNumber(coordinates, 1);
          const initialCells = grid.toJSON().cells.length;
          grid.removeCell(coordinates);
          expect(grid.toJSON().cells.length).toBeLessThan(initialCells);
        });

        it('should not throw an error if the cell does not exist', () => {
          expect(() => grid.removeCell([0, 0])).not.toThrow();
        });
      });
    });
  });
});
