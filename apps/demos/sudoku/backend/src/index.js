const Difficulty = Object.freeze({
    EASY: 'beginner',
    MEDIUM: 'intermediate',
    HARD: 'advanced',
    EXTREME: 'expert'
});
class SudokuCell {
    grid;
    _rowIndex;
    _columnIndex;
    _number;
    _rowNeighbors;
    _columnNeighbors;
    _blockNeighbors;
    _neighbors;
    constructor(rowIndex, columnIndex, grid) {
        this.grid = grid;
        this._rowIndex = rowIndex;
        this._columnIndex = columnIndex;
        this._rowNeighbors = this.getRowNeighbors();
        this._columnNeighbors = this.getColumnNeighbors();
        this._blockNeighbors = this.getBlockNeighbors();
        this._neighbors = new Set([...this._rowNeighbors, ...this._columnNeighbors, ...this._blockNeighbors]);
    }
    get id() {
        return this._rowIndex * this.grid.scale + this._columnIndex;
    }
    get number() {
        return this._number;
    }
    set number(value) {
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
    get rowNeighbors() {
        return this._rowNeighbors;
    }
    get columnNeighbors() {
        return this._columnNeighbors;
    }
    get blockNeighbors() {
        return this._blockNeighbors;
    }
    get neighbors() {
        return this._neighbors;
    }
    get validNumbers() {
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
    get isValid() {
        return this.isEmpty || this.validNumbers.has(this.number ?? 0);
    }
    get isInvalid() {
        return !this.isValid;
    }
    getRowNeighbors() {
        const Neighbors = new Set();
        const { scale } = this.grid;
        const rowIdOffset = this._rowIndex * scale;
        for (let columnIndex = 0; columnIndex < scale; columnIndex++) {
            Neighbors.add(rowIdOffset + columnIndex);
        }
        if (Neighbors.delete(this.id)) {
            return Neighbors;
        }
        throw new Error('Finding row Neighbors failed to use the correct row.');
    }
    getColumnNeighbors() {
        const Neighbors = new Set();
        const { scale } = this.grid;
        for (let rowIndex = 0; rowIndex < scale; rowIndex++) {
            Neighbors.add(rowIndex * scale + this._columnIndex);
        }
        if (Neighbors.delete(this.id)) {
            return Neighbors;
        }
        throw new Error('Finding column Neighbors failed to use the correct column.');
    }
    getBlockNeighbors() {
        const Neighbors = new Set();
        const { scale, blockScale, hasBlocks } = this.grid;
        if (!hasBlocks) {
            return new Set();
        }
        const blockRowOffset = Math.floor(this._rowIndex / blockScale) * blockScale;
        const blockColumnOffset = Math.floor(this._columnIndex / blockScale) * blockScale;
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
class SudokuGrid {
    _scale;
    _validCellNumbers;
    cellInstances = new Map();
    constructor(scale = 9) {
        this._scale = scale;
        this._validCellNumbers = new Set(Array.from({ length: scale }, (_, i) => i + 1));
        this.initializeGrid();
    }
    get scale() {
        return this._scale;
    }
    get cellCount() {
        return this.scale * this.scale;
    }
    get cells() {
        return Array.from(this.cellInstances.values());
    }
    get emptyCells() {
        const result = [];
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
    get hasBlocks() {
        return Number.isInteger(this.blockScale);
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
    getCell(cellId) {
        const cell = this.cellInstances.get(cellId);
        if (cell)
            return cell;
        throw new Error('Cannot find a cell with the given cellId');
    }
    setCellNumber(cellId, value) {
        if (this._validCellNumbers.has(value)) {
            this.getCell(cellId).number = value;
        }
        else {
            throw new Error('Given cell value is not valid for the grid: ' + value + '\n' + this.toGridString());
        }
    }
    toGridString() {
        const makeBorder = (leftEdge, afterRow, afterBand, rightEdge, segment) => {
            let border = leftEdge;
            for (let i = 0; i < this.scale; i++) {
                border += segment;
                if (i === this.scale - 1) {
                    border += rightEdge;
                }
                else if ((i + 1) % this.blockScale === 0) {
                    border += afterBand;
                }
                else {
                    border += afterRow;
                }
            }
            return border;
        };
        const topBorder = makeBorder('┏', '┯', '┳', '┓', '━━━');
        const afterRowBorder = makeBorder('┠', '┼', '╂', '┨', '───');
        const afterBandBorder = makeBorder('┣', '┿', '╋', '┫', '━━━');
        const bottomBorder = makeBorder('┗', '┷', '┻', '┛', '━━━');
        const result = [topBorder];
        let rowString = '';
        for (const cell of this.cells) {
            const columnIndex = cell.id % this.scale;
            if (columnIndex === 0) {
                rowString += '┃';
            }
            rowString += ` ${cell.number ? cell.number : ' '} `;
            if ((columnIndex + 1) % this.blockScale === 0) {
                rowString += '┃';
            }
            else {
                rowString += '│';
            }
            if (columnIndex === this.scale - 1) {
                result.push(rowString);
                rowString = '';
                if (cell.id === this.cellCount - 1) {
                    result.push(bottomBorder);
                }
                else if (((cell.id + 1) / this.scale) % this.blockScale === 0) {
                    result.push(afterBandBorder);
                }
                else {
                    result.push(afterRowBorder);
                }
            }
        }
        return result.join('\n');
    }
    initializeGrid() {
        for (let rowIndex = 0; rowIndex < this.scale; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.scale; columnIndex++) {
                const cell = new SudokuCell(rowIndex, columnIndex, this);
                this.cellInstances.set(cell.id, cell);
            }
        }
    }
}
class SudokuGame {
    _difficulty;
    _grid;
    isInitialized = false;
    constructor(difficulty, scale = 9) {
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
    solveGrid() {
        const { cellCount, isSolved } = this.grid;
        let fallbackCell;
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
                }
                else {
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
    fillGrid() {
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
    reduceToPuzzle() {
        if (!this.grid.isSolved) {
            throw new Error('Puzzle reduction occuring before grid is filled');
        }
        return;
    }
}
const game = new SudokuGame(Difficulty.EASY);
game.generateGame();
export {};
