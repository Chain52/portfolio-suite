import { SudokuCell } from '../index.js';
import { mockReadOnlyPropertyDescriptor } from './utils/index.js';

describe('SudokuCell', () => {
  let cell: SudokuCell;

  beforeEach(() => {
    cell = new SudokuCell(0, 0);
  });

  describe('Initialization', () => {
    it('should be able to initialize', () => {
      expect(cell).toBeInstanceOf(SudokuCell);
    });

    it('should initialize with an X position', () => {
      expect(cell.x).toBe(0);
    });

    it('should initialize with a Y position', () => {
      expect(cell.y).toBe(0);
    });

    it('should initialize as empty', () => {
      expect(cell.isEmpty).toBe(true);
    });
  });

  describe('Property Access', () => {
    describe('Number', () => {
      it('should be undefined on initialization', () => {
        expect(cell.number).toBeUndefined();
      });

      it('should be able to be set', () => {
        cell.number = 1;
        expect(cell.number).toBe(1);
      });

      it('should be able to be unset', () => {
        cell.number = 1;
        cell.number = undefined;
        expect(cell.number).toBeUndefined();
      });

      // XXX: May need to change if variant sudoku is implemented.
      it.each([0, -1])('should reject %i as invalid', (val) => {
        expect(() => (cell.number = val)).toThrow();
      });
    });

    describe('Read-Only Properties', () => {
      describe('Position', () => {
        it('should have X position property', () => {
          const xDescriptor = Object.getOwnPropertyDescriptor(cell, 'x');
          expect(xDescriptor).toMatchObject(mockReadOnlyPropertyDescriptor(cell.x));
        });

        it('should have Y position property', () => {
          const yDescriptor = Object.getOwnPropertyDescriptor(cell, 'y');
          expect(yDescriptor).toMatchObject(mockReadOnlyPropertyDescriptor(cell.y));
        });
      });

      describe('State', () => {
        it('should have isEmpty property', () => {
          const isEmptyDescriptor = Object.getOwnPropertyDescriptor(cell, 'isEmpty');
          expect(isEmptyDescriptor).toMatchObject(mockReadOnlyPropertyDescriptor(cell.isEmpty));
        });

        it('should have isNotEmpty property', () => {
          const isNotEmptyDescriptor = Object.getOwnPropertyDescriptor(cell, 'isNotEmpty');
          expect(isNotEmptyDescriptor).toMatchObject(mockReadOnlyPropertyDescriptor(cell.isNotEmpty));
        });

        it('should detect itself as empty', () => {
          cell.number = undefined;
          expect({ isEmpty: cell.isEmpty, isNotEmpty: cell.isNotEmpty }).toEqual({
            isEmpty: true,
            isNotEmpty: false
          });
        });

        it('should detect itself as not empty', () => {
          cell.number = 1;
          expect({ isEmpty: cell.isEmpty, isNotEmpty: cell.isNotEmpty }).toEqual({
            isEmpty: false,
            isNotEmpty: true
          });
        });
      });
    });
  });
});
