import Cell, { CellJSON } from './Cell';

export type Coordinates = [number, number];

interface GridJSON {
  scale: number;
  cells: Array<{
    coordinates: Coordinates;
    cell: CellJSON;
  }>;
}

export default class Grid {
  readonly #scale: number;
  readonly #numberOptions: Set<number>;

  #cells: Map<Coordinates, Cell>;

  constructor(scale: number) {
    this.#scale = scale;
    this.#numberOptions = new Set(
      Array.from({ length: scale }, (_, i) => i + 1)
    );
    this.#cells = new Map<Coordinates, Cell>();
  }

  toJSON(): GridJSON {
    return {
      scale: this.#scale,
      cells: Array.from(this.#cells.entries()).map(([coordinates, cell]) => {
        return {
          coordinates: coordinates,
          cell: cell.toJSON()
        };
      })
    };
  }

  setCellNumber([row, col]: Coordinates, value: number | undefined): void {
    const validation = {
      coordinateError: this.validateAndGetErrorMessage
    };

    if (validation.some((v) => v !== undefined)) {
    }

    if (coordinatesError) {
      throw new Error(coordinatesError);
    }
    if (!this.isValidCoordinates([row, col])) {
      throw new Error(this.getInvalidCoordinatesErrorMessage([row, col]));
    }
    if (!this.isValidCellNumber(value)) {
      throw new Error(this.getInvalidCellNumberErrorMessage(value));
    }

    const cell = this._cells.get([row, col]);
    if (cell) {
      cell.number = value;
    } else {
      this._cells.set([row, col], new Cell(value));
    }
  }

  removeCell([row, col]: Coordinates): void {
    if (this._cells.has([row, col])) {
      this._cells.delete([row, col]);
    }
  }

  private isValidCoordinates(coordinates: Coordinates): string | undefined {
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      return `Invalid coordinates: ${JSON.stringify(coordinates)}. Must be an array of two numbers.`;
    } else {
      const [row, col] = coordinates;
      const errorLines = [
        `Invalid coordinates: [${row}, ${col}]. Error details:`
      ];
      // Type checks for row and column indices
      if (typeof row !== 'number') {
        errorLines.push(`- Row index must be a number, but got ${typeof row}.`);
      }
      if (typeof col !== 'number') {
        errorLines.push(
          `- Column index must be a number, but got ${typeof col}.`
        );
      }
      // Range checks for row and column indices
      if (row < 0) {
        errorLines.push(
          `- Row index must be a non-negative integer, but got ${row}.`
        );
      }
      if (col < 0) {
        errorLines.push(
          `- Column index must be a non-negative integer, but got ${col}.`
        );
      }
      if (row >= this.scale) {
        errorLines.push(
          `- Row index ${row} is out of bounds for grid scale ${this.scale}.`
        );
      }
      if (col >= this.scale) {
        errorLines.push(
          `- Column index ${col} is out of bounds for grid scale ${this.scale}.`
        );
      }
      if (errorLines.length > 1) {
        return errorLines.join('\n');
      }
    }
  }
}
