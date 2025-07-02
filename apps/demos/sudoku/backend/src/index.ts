const Difficulty = Object.freeze({
  EASY: 'beginner',
  MEDIUM: 'intermediate',
  HARD: 'advanced',
  EXTREME: 'expert'
});
type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export const DEFAULT_SCALE = 9;

export class SudokuCell {
  private grid: SudokuGrid;

  private _x: number;
  private _y: number;

  private _number: number | undefined;

  private _rowNeighbors: Set<number>;
  private _columnNeighbors: Set<number>;
  private _blockNeighbors: Set<number>;
  private _neighbors: Set<number>;

  constructor(x: number, y: number, grid: SudokuGrid) {
    this.grid = grid;

    this._x = x;
    this._y = y;

    this._rowNeighbors = this.getRowNeighbors();
    this._columnNeighbors = this.getColumnNeighbors();
    this._blockNeighbors = this.getBlockNeighbors();
    this._neighbors = new Set([...this._rowNeighbors, ...this._columnNeighbors, ...this._blockNeighbors]);
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get id(): number {
    return this.y * this.grid.scale + this.x;
  }

  get number(): number | undefined {
    return this._number;
  }

  set number(value: number | undefined) {
    if (value) {
      if (value > this.grid.scale) {
        throw new Error('Number of a cell cannot exceed the scale of the grid');
      }
      if (value < 0) {
        throw new Error('Number of a cell cannot be negative');
      }
      if (value === 0) {
        value = undefined;
      }
    }
    this._number = value;
  }

  get rowNeighbors(): Set<number> {
    return this._rowNeighbors;
  }

  get columnNeighbors(): Set<number> {
    return this._columnNeighbors;
  }

  get blockNeighbors(): Set<number> {
    return this._blockNeighbors;
  }

  get neighbors(): Set<number> {
    return this._neighbors;
  }

  get validNumbers(): Set<number> {
    const validNumbers = new Set(this.grid.cellNumberOptions);
    this.neighbors.forEach((neighbor) => {
      const cell = this.grid.getCell(neighbor);
      if (cell.number) {
        validNumbers.delete(cell.number);
      }
    });
    return validNumbers;
  }

  get isEmpty() {
    return this.number === undefined;
  }

  get isNotEmpty() {
    return !this.isEmpty;
  }

  get isValid() {
    return this.isEmpty || this.validNumbers.has(this.number ?? 0);
  }

  get isInvalid() {
    return !this.isValid;
  }

  private getRowNeighbors(): Set<number> {
    const Neighbors = new Set<number>();
    const { scale } = this.grid;
    const rowIdOffset = this.y * scale;

    for (let columnIndex = 0; columnIndex < scale; columnIndex++) {
      Neighbors.add(rowIdOffset + columnIndex);
    }
    if (Neighbors.delete(this.id)) {
      return Neighbors;
    }
    throw new Error('Finding row Neighbors failed to use the correct row.');
  }

  private getColumnNeighbors(): Set<number> {
    const Neighbors = new Set<number>();
    const { scale } = this.grid;

    for (let rowIndex = 0; rowIndex < scale; rowIndex++) {
      Neighbors.add(rowIndex * scale + this.x);
    }
    if (Neighbors.delete(this.id)) {
      return Neighbors;
    }
    throw new Error('Finding column Neighbors failed to use the correct column.');
  }

  private getBlockNeighbors(): Set<number> {
    const Neighbors = new Set<number>();
    const { scale, blockScale, hasBlocks } = this.grid;

    if (!hasBlocks) {
      return new Set<number>();
    }

    const blockRowOffset = Math.floor(this.y / blockScale) * blockScale;
    const blockColumnOffset = Math.floor(this.x / blockScale) * blockScale;

    for (let rowIndex = 0; rowIndex < blockScale; rowIndex++) {
      for (let columnIndex = 0; columnIndex < blockScale; columnIndex++) {
        Neighbors.add((blockRowOffset + rowIndex) * scale + (blockColumnOffset + columnIndex));
      }
    }

    if (Neighbors.delete(this.id)) {
      return Neighbors;
    }
    throw new Error('Finding block Neighbors failed to use the correct block');
  }
}

export class SudokuGrid {
  private _scale: number;
  private _validCellNumbers: Set<number>;
  private cellInstances: Map<number, SudokuCell> = new Map<number, SudokuCell>();

  constructor(scale = 9) {
    this._scale = scale;
    this._validCellNumbers = new Set(Array.from({ length: scale }, (_, i) => i + 1));
    this.initializeGrid();
  }

  get scale() {
    return this._scale;
  }

  get cells() {
    return Array.from(this.cellInstances.values());
  }

  get cellCount() {
    return this.scale * this.scale;
  }

  get emptyCells() {
    const result: SudokuCell[] = [];

    for (const cell of this.cells) {
      if (cell.isEmpty) {
        result.push(cell);
      }
    }
    return result;
  }

  get blockScale() {
    return Math.sqrt(this.scale);
  }

  get blockCount() {
    if (Number.isInteger(this.blockScale)) {
      return this.cellCount / this.blockScale;
    }
    return 0;
  }

  get hasBlocks() {
    return !!this.blockCount;
  }

  get cellNumberOptions() {
    return new Set(Array.from(this._validCellNumbers));
  }

  get isSolved() {
    for (const cell of this.cells) {
      if (cell.isInvalid || cell.isEmpty) {
        return false;
      }
    }
    return true;
  }

  getCell(cellId: number) {
    const cell = this.cellInstances.get(cellId);
    if (cell) return cell;
    throw new Error('Cannot find a cell with the given cellId');
  }

  setCellNumber(cellId: number, value: number) {
    if (this._validCellNumbers.has(value)) {
      this.getCell(cellId).number = value;
    } else {
      throw new Error('Given cell value is not valid for the grid: ' + value + '\n' + this.toGridString());
    }
  }

  toGridString() {
    const makeBorder = (leftEdge: string, afterRow: string, afterBand: string, rightEdge: string, segment: string) => {
      let border = leftEdge;

      for (let i = 0; i < this.scale; i++) {
        border += segment;
        if (i === this.scale - 1) {
          border += rightEdge;
        } else if ((i + 1) % this.blockScale === 0) {
          border += afterBand;
        } else {
          border += afterRow;
        }
      }
      return border;
    };
    const topBorder = makeBorder('┏', '┯', '┳', '┓', '━━━');
    const afterRowBorder = makeBorder('┠', '┼', '╂', '┨', '───');
    const afterBandBorder = makeBorder('┣', '┿', '╋', '┫', '━━━');
    const bottomBorder = makeBorder('┗', '┷', '┻', '┛', '━━━');

    const result: string[] = [topBorder];

    let rowString: string = '';
    for (const cell of this.cells) {
      const columnIndex = cell.id % this.scale;
      if (columnIndex === 0) {
        rowString += '┃';
      }
      rowString += ` ${cell.number ? cell.number : ' '} `;
      if ((columnIndex + 1) % this.blockScale === 0) {
        rowString += '┃';
      } else {
        rowString += '│';
      }
      if (columnIndex === this.scale - 1) {
        result.push(rowString);
        rowString = '';

        if (cell.id === this.cellCount - 1) {
          result.push(bottomBorder);
        } else if (((cell.id + 1) / this.scale) % this.blockScale === 0) {
          result.push(afterBandBorder);
        } else {
          result.push(afterRowBorder);
        }
      }
    }
    return result.join('\n');
  }

  private initializeGrid() {
    for (let id = 0, x = 0, y = 0; id < this.cellCount; id++, x++) {
      if (x === this.scale) {
        x = 0;
        y += 1;
      }
      this.cellInstances.set(id, new SudokuCell(x, y, this));
    }
  }
}

class SudokuGame {
  private _difficulty: Difficulty;
  private _grid: SudokuGrid;
  private isInitialized = false;

  constructor(difficulty: Difficulty, scale = 9) {
    this._difficulty = difficulty;
    this._grid = new SudokuGrid(scale);
  }

  get difficulty() {
    return this._difficulty;
  }

  get grid() {
    return this._grid;
  }

  generateGame() {
    this.fillGrid();
    this.reduceToPuzzle();
    console.log(this.grid.toGridString());
  }

  private solveGrid() {
    const { cellCount, isSolved } = this.grid;
    let fallbackCell: SudokuCell | undefined;
    let solveIndex = 0;

    while (!isSolved) {
      const currentCell = this.grid.getCell(solveIndex % cellCount);

      if (currentCell.id === 0) {
        if (fallbackCell) {
          if (this.grid.emptyCells.length < cellCount / 2) {
            console.log(`Failed to generate:\n${this.grid.toGridString()}\n\n`);
            break;
          }
          const validNumbers = [...fallbackCell.validNumbers];
          fallbackCell.number = validNumbers[Math.floor(Math.random() * validNumbers.length)];
          fallbackCell = undefined;
          console.log(`Fallback number added:\n${this.grid.toGridString()}\n\n`);
        }
      }

      if (currentCell.isEmpty) {
        if (currentCell.validNumbers.size === 1) {
          currentCell.number = [...currentCell.validNumbers][0];
          console.log(`New number added:\n${this.grid.toGridString()}\n\n`);

          fallbackCell = undefined;
          solveIndex = -1;
        } else {
          // Set a random fallbackCell from the set of empty cells if we still need one
          // Randomness utilized to spread numbers throughout the grid to make for easier solves
          if (!fallbackCell) {
            fallbackCell = this.grid.emptyCells[Math.floor(Math.random() * this.grid.emptyCells.length)];
          }
        }
      }
      solveIndex += 1;
    }
  }

  private fillGrid() {
    if (this.isInitialized) {
      throw new Error('You can fill the');
    }
    const { cellCount, scale } = this.grid;
    const seededCellId = Math.floor(Math.random() * cellCount);
    const seededCellNumber = Math.floor(Math.random() * scale) + 1;

    // seed random cell
    this._grid.setCellNumber(seededCellId, seededCellNumber);
    this.solveGrid();
    this.isInitialized = true;
  }

  private reduceToPuzzle() {
    if (!this.grid.isSolved) {
      throw new Error('Puzzle reduction occuring before grid is filled');
    }
    return;
  }
}

const game = new SudokuGame(Difficulty.EASY);
game.generateGame();
