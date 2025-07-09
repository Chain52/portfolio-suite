export interface CellJSON {
  number: number | undefined;
}

export default class Cell {
  private _number: number | undefined;

  constructor(number?: number) {
    this._number = number;
  }

  get number(): number | undefined {
    return this._number;
  }

  set number(value: number | undefined) {
    this._number = value;
  }

  public toJSON(): CellJSON {
    return {
      number: this._number ?? 0 // Return 0 if number is undefined
    };
  }
}
