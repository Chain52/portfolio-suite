import { SudokuCell, SudokuGrid } from '../index';
import { mockReadOnlyPropertyDescriptor } from './utils';

const GRID_TEST_SUITES = [
  {
    name: 'given a single cell initialization',
    scale: 1,
    block: {
      scale: 1,
      present: true
    },
    solution: [1]
  },
  {
    name: 'given a perfect square initialization',
    scale: 4,
    block: {
      scale: 2,
      present: true
    },
    solution: [1, 2, 3, 4, 4, 3, 2, 1, 2, 4, 1, 3, 3, 1, 4, 2]
  },
  {
    name: 'given an imperfect square initialization',
    scale: 2,
    block: {
      scale: Math.sqrt(2),
      present: false
    },
    solution: [1, 2, 2, 1]
  }
];

describe('SudokuGrid', () => {
  let grid: SudokuGrid;

  describe.each(GRID_TEST_SUITES)('$name', ({ scale, block, solution }) => {
    beforeEach(() => {
      grid = new SudokuGrid(scale);
    });

    // Initialization Behaviors
    describe('Initialization', () => {
      it('should be able to initialize', () => {
        expect(grid).toBeInstanceOf(SudokuGrid);
      });

      it('should initialize with the correct scale', () => {
        expect(grid.scale).toBe(scale);
      });

      it(`should initialize with ${scale > 1 ? '' : 'a'} valid cell number option${scale > 1 ? 's' : ''}`, () => {
        expect([...grid.cellNumberOptions]).toEqual(Array.from({ length: scale }, (_, i) => i + 1));
      });

      it(`should initialize with its cell${scale > 1 ? 's' : ''}`, () => {
        expect(grid.cells.length).toBe(scale * scale);
      });
    });

    describe('Properties', () => {
      it('should not have any settable properties', () => {
        const gridPropDescriptors = Object.getOwnPropertyDescriptors(grid);
        const notHasMutable = Object.values(gridPropDescriptors).every(
          (descriptor) => !!!descriptor.writable && !!!descriptor.set
        );
        expect(notHasMutable).toBe(true);
      });

      describe('Metrics', () => {
        it('should expose its scale', () => {
          const scaleDescriptor = Object.getOwnPropertyDescriptor(grid, 'scale');
          expect(scaleDescriptor).toMatchObject(mockReadOnlyPropertyDescriptor(grid.scale));
        });

        // XXX: Not sure if cell count is actually needed outside the grid
        it('should expose its cell count', () => {
          const cellCountDescriptor = Object.getOwnPropertyDescriptor(grid, 'cellCount');
          expect(cellCountDescriptor).toMatchObject(mockReadOnlyPropertyDescriptor(grid.cellCount));
        });

        it('should have a cell count equal to square of scale', () => {
          expect(grid.cellCount).toBe(scale * scale);
        });
      });

      describe('Cells', () => {
        it('should expose its cells', () => {
          const cellsDescriptor = Object.getOwnPropertyDescriptor(grid, 'cells');
          expect(cellsDescriptor).toMatchObject(mockReadOnlyPropertyDescriptor(grid.cells));
        });

        it('should expose its empty cells', () => {
          const emptyCellsDescriptor = Object.getOwnPropertyDescriptor(grid, 'emptyCells');
          expect(emptyCellsDescriptor).toMatchObject(mockReadOnlyPropertyDescriptor(grid.emptyCells));
        });
      });

      describe('State', () => {
        it('should expose if it is solved', () => {
          const isSolvedDescriptor = Object.getOwnPropertyDescriptor(grid, 'isSolved');
          expect(isSolvedDescriptor).toMatchObject(mockReadOnlyPropertyDescriptor(grid.isSolved));
        });

        it('should detect if it is unsolved', () => {
          expect(grid.isSolved).toBe(false);
        });

        it('should detect if it is solved', () => {
          solution.forEach((cellNumber, i) => {
            grid.setCellNumber(i, cellNumber);
          });
          expect(grid.isSolved).toBe(true);
        });
      });
    });

    describe('Methods', () => {
      describe('Getting a Cell', () => {
        it('should allow getting a cell by valid position', () => {
          expect(grid.getCell([0, 0])).toBeInstanceOf(SudokuCell);
        });

        it.each([
          [-1, 0],
          [0, -1],
          [-1, -1],
          [scale, 0],
          [0, scale],
          [scale, scale]
        ])('should reject [%i, %i] as invalid cell position', (x, y) => {
          expect(() => grid.getCell([x, y])).toThrow();
        });
      });

      describe('Setting Cell Numbers', () => {
        it('should allow setting a valid cell number', () => {
          expect(() => grid.setCellNumber(0, 1)).not.toThrow();
        });

        it('should allow unsetting of a cell number', () => {
          expect(() => grid.setCellNumber(0, undefined)).not.toThrow();
        });

        it.each([0, -1, scale + 1])('should reject %i as an invalid cell number', (val) => {
          expect(() => grid.setCellNumber(0, val)).toThrow();
        });
      });
    });
  });
});
