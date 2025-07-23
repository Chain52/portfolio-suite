import { GridMutationType } from '@sudoku-backend/common/schema';
import { Map, List } from 'immutable';
import { GridMutation } from '../solver';

export type Coordinates = [number, number];

const CandidateState = Object.freeze({
  Expired: 0,
  Cached: 1
});
type CandidateState = (typeof CandidateState)[keyof typeof CandidateState];

class Cell {
  coordinates: Coordinates;
  #number: number | undefined;
  #candidates: Set<number>;
  candidateState: CandidateState = CandidateState.Expired;

  constructor(coordinates: Coordinates, number?: number) {
    this.coordinates = coordinates;
    this.#number = number;
    this.#candidates = new Set<number>();
  }

  get number(): number | undefined {
    return this.#number;
  }

  set number(value: number | undefined) {
    this.#number = value;
    this.candidateState = CandidateState.Expired;
  }

  get candidates() {
    if (this.candidateState === CandidateState.Expired) {
      this.#candidates = new Set<number>();
    }
    return this.#candidates;
  }

  set candidates(value: Set<number>) {
    this.#candidates = value;
    this.candidateState = CandidateState.Cached;
  }

  get hasNumber() {
    return typeof this.number === 'number';
  }
}

export class Grid {
  readonly #scale: number;
  readonly #possibleNumbers: List<number>;
  #cells: Map<number, Cell>;

  constructor(
    scale: number,
    cells: Map<number, Cell> = Map(
      // TODO: create arrayFrom1toN util function
      Array.from({ length: scale * scale }, (_, i) => [
        i,
        new Cell([i % scale, Math.floor(i / scale)] satisfies Coordinates)
      ])
    )
  ) {
    this.#scale = scale;
    this.#possibleNumbers = List(
      Array.from({ length: this.#scale }, (_, i) => i + 1)
    );
    this.#cells = cells;
  }

  static from(gridString: string): Grid {
    const values = gridString.split(',');
    const scale = Math.sqrt(values.length);
    if (Number.isInteger(scale)) {
      const cells: Array<[number, Cell]> = values.map((value, i) => {
        const coords = [i % scale, Math.floor(i / scale)] satisfies Coordinates;
        const cell = new Cell(coords);

        if (value) {
          const parsed = Number(value);
          if (!Number.isInteger(parsed)) {
            throw new Error('An invalid grid string was supplied.');
          }
          cell.number = parsed;
        }
        return [i, cell];
      });
      return new Grid(scale, Map(cells));
    }
    throw new Error('An invalid grid string was supplied.');
  }

  get scale(): number {
    return this.#scale;
  }

  get size(): number {
    return this.#scale * this.#scale;
  }

  get isEmpty(): boolean {
    return this.#cells.every((cell) => !cell.hasNumber);
  }

  get hasEmptyCells(): boolean {
    return this.#cells.some((cell) => !cell.hasNumber);
  }

  get blockScale(): number {
    const potential = Math.sqrt(this.#scale);
    return Number.isInteger(potential) ? potential : 0;
  }

  getCellNumber(location: Coordinates | number): number | undefined {
    return this.#getCell(location).number;
  }

  setCellNumber(
    location: Coordinates | number,
    value: number | undefined
  ): GridMutation {
    const cell = this.#getCell(location);
    cell.number = this.#validateCellNumber(value);

    const neighbors = this.#getCellNeighbors(cell);

    for (const neighbor of neighbors) {
      neighbor.candidateState = CandidateState.Expired;
    }
    return {
      type: GridMutationType.Number,
      coordinates: cell.coordinates,
      number: cell.number
    };
  }

  getBlockIndex(location: Coordinates | number): number {
    if (this.blockScale) {
      const [col, row] = this.#getCell(location).coordinates;
      return (
        Math.floor(row / this.blockScale) * this.blockScale +
        Math.floor(col / this.blockScale)
      );
    }
    return -1;
  }

  getCellCandidates(location: Coordinates | number): Array<number> {
    const cell = this.#getCell(location);
    if (!cell.hasNumber && cell.candidates.size === 0) {
      cell.candidates = this.#getBasicallyReducedCandidates(cell);
    }
    return Array.from(cell.candidates);
  }

  setCellCandidates(coords: Coordinates, candidates: Set<number>) {
    this.#setCellCandidates(this.#getCell(coords), candidates);
  }

  #setCellCandidates(cell: Cell, candidates: Set<number>) {
    cell.candidates = candidates;
  }

  #getCell(location: Coordinates | number): Cell {
    const cell = this.#cells.get(this.#validateLocation(location));
    if (!cell) {
      throw new Error('Cell could not be found at the given location');
    }

    return cell;
  }

  #getCellNeighbors(cell: Cell): Array<Cell> {
    const neighbors: Array<Cell> = [];
    const [cellCol, cellRow] = cell.coordinates;

    for (let col = 0; col < this.#scale; col++) {
      if (col !== cellCol) {
        neighbors.push(this.#getCell([col, cellRow]));
      }
    }

    for (let row = 0; row < this.#scale; row++) {
      if (row !== cellRow) {
        neighbors.push(this.#getCell([cellCol, row]));
      }
    }

    if (this.blockScale) {
      const [blockStart, blockEnd] = this.#resolveBlock(cell.coordinates);
      if (blockStart) {
        for (let x = blockStart[0]; x <= blockEnd[0]; x++) {
          if (x !== cellCol) {
            for (let y = blockStart[1]; y <= blockEnd[1]; y++) {
              if (y !== cellRow) {
                neighbors.push(this.#getCell([x, y]));
              }
            }
          }
        }
      }
    }

    return neighbors;
  }

  #getBasicallyReducedCandidates(cell: Cell): Set<number> {
    const candidates = new Set(this.#possibleNumbers);
    const [col, row] = cell.coordinates;

    const checkAndReduce = (neighbor: Cell) => {
      if (neighbor.number) {
        candidates.delete(neighbor.number);
      }
    };

    for (let x = 0; x < this.#scale; x++) {
      checkAndReduce(this.#getCell([x, row]));
    }

    for (let y = 0; y < this.#scale; y++) {
      checkAndReduce(this.#getCell([col, y]));
    }

    if (this.blockScale) {
      const [blockStart, blockEnd] = this.#resolveBlock(cell.coordinates);
      if (blockStart) {
        for (let x = blockStart[0]; x <= blockEnd[0]; x++) {
          if (x !== col) {
            for (let y = blockStart[1]; y <= blockEnd[1]; y++) {
              if (y !== row) {
                checkAndReduce(this.#getCell([x, y]));
              }
            }
          }
        }
      }
    }

    return candidates;
  }

  #resolveBlock(coords: Coordinates): [Coordinates, Coordinates] {
    this.#validateCoords(coords);

    const blockStart: Coordinates = [
      Math.floor(coords[0] / this.blockScale) * this.blockScale,
      Math.floor(coords[1] / this.blockScale) * this.blockScale
    ];
    return [
      blockStart,
      [blockStart[0] + this.blockScale - 1, blockStart[1] + this.blockScale - 1]
    ];
  }

  #validateLocation(location: Coordinates | number): number {
    if (typeof location === 'number') {
      if (location >= this.size) {
        throw new Error(
          `Invalid location index: ${location} is outside the bounds of the grid (${this.size})`
        );
      }
      if (location < 0) {
        throw new Error(
          `Invalid location index: ${location} cannot be negative`
        );
      }
      return location;
    }
    return this.#validateCoords(location);
  }

  #validateCoords(coords: Coordinates): number {
    if (!Array.isArray(coords) || coords.length !== 2) {
      throw new Error(
        `Invalid coordinates: ${JSON.stringify(coords)}. Must be an array of two numbers.`
      );
    }
    const [col, row] = coords;
    const errorLines = [
      `Invalid coordinates: [${col}, ${row}]. Error details:`
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
    if (row >= this.#scale) {
      errorLines.push(
        `- Row index ${row} is out of bounds for grid scale ${this.#scale}.`
      );
    }
    if (col >= this.#scale) {
      errorLines.push(
        `- Column index ${col} is out of bounds for grid scale ${this.#scale}.`
      );
    }
    if (errorLines.length > 1) {
      throw new Error(errorLines.join('\n'));
    }
    return row * this.#scale + col;
  }

  #validateCellNumber<T extends number | undefined>(value: T): T {
    if (typeof value !== 'undefined') {
      if (typeof value !== 'number') {
        throw new Error(`Invalid cell number: ${value}. Must be a number.`);
      } else if (value < 1) {
        throw new Error(
          `Invalid cell number: ${value}. Must be a non-negative/non-zero number.`
        );
      } else if (value > this.#scale) {
        throw new Error(
          `Invalid cell number: ${value}. Must in bounds of the grid scale ${this.#scale}.`
        );
      }
    }
    return value;
  }
}
