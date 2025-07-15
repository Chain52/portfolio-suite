import { GridMutationType } from '@sudoku-backend/common/schema';
import { Coordinates, Grid } from '../grid';

type CellMutationTypes =
  | typeof GridMutationType.Number
  | typeof GridMutationType.Note;
type LinkMutationTypes =
  | typeof GridMutationType.WeakLink
  | typeof GridMutationType.StrongLink;

// XXX: May belong with Grid types
export type CellMutation = {
  type: CellMutationTypes;
  coordinates: Coordinates;
  number: number | undefined;
};

type LinkMutation = {
  type: LinkMutationTypes;
  coordinates: [Coordinates, Coordinates];
  operation: boolean; // true if adding link; false if removing
};

export type GridMutation = CellMutation | LinkMutation;

type TechniqueApplicationSuccess = {
  technique: string; // TODO: replace with Technique enum
  mutation: GridMutation;
};

type TechniqueApplicationFail = {
  technique: string; // TODO: replace with Technique enum
  mutation?: undefined;
};

export type TechniqueApplicationResult =
  | TechniqueApplicationSuccess
  | TechniqueApplicationFail;

export interface Technique {
  get name(): string;
  apply(grid: Grid): TechniqueApplicationResult;
}

export interface SolutionTrace {
  techniques: string[]; // TODO: replace with Technique enum
  get count(): number;
}

export type Solution = TechniqueApplicationSuccess[];
