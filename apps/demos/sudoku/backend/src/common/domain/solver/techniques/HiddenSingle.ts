import { Coordinates, Grid } from '@sudoku-backend/common/domain';

import { Technique, type TechniqueApplicationResult } from '../types';
import { arrayFrom0toN } from '@sudoku-backend/common/utils/arrayUtils';

type Candidate = number;
type CandidateMap = Map<Candidate, Array<Coordinates>>;
type GridPartCollection = Array<CandidateMap>;

// Rows is not needed since it can easily be checked at runtime
type GridMap = {
  columns: GridPartCollection;
  blocks: GridPartCollection;
};

export default class HiddenSingle implements Technique {
  get name() {
    return 'Hidden Single';
  }

  apply(grid: Grid): TechniqueApplicationResult {
    let mutation: TechniqueApplicationResult['mutation'];

    const gridMap: GridMap = {
      columns: [],
      blocks: []
    };

    const checkForHiddenSingle = (
      candidateMap: CandidateMap
    ): TechniqueApplicationResult['mutation'] | undefined => {
      for (const [value, positions] of candidateMap) {
        if (positions.length === 1) {
          return grid.setCellNumber(positions[0], value);
        }
      }
    };

    const appendMap = (
      map: CandidateMap,
      candidate: number,
      coordinates: Coordinates
    ) => {
      let mapElement = map.get(candidate);
      if (!mapElement) {
        const possiblePositions: Array<Coordinates> = [];
        map.set(candidate, possiblePositions);
        mapElement = possiblePositions;
      }
      mapElement.push(coordinates);
    };

    let rowMap: CandidateMap;
    let columnMap = new Map<Candidate, Array<Coordinates>>();
    let blockMap = new Map<Candidate, Array<Coordinates>>();

    for (let row = 0; row < grid.scale && !mutation; row++) {
      rowMap = new Map<Candidate, Array<Coordinates>>();

      for (let col = 0; col < grid.scale && !mutation; col++) {
        const number = grid.getCellNumber([col, row]);
        const block = grid.getBlockIndex([col, row]);
        const hasBlocks = block >= 0;

        if (hasBlocks) {
          if (gridMap.blocks.length === block) {
            gridMap.blocks.push(new Map<Candidate, Array<Coordinates>>());
          }
          blockMap = gridMap.blocks[block];
        }

        if (row === 0) {
          gridMap.columns.push(new Map<Candidate, Array<Coordinates>>());
        }
        columnMap = gridMap.columns[col];

        if (!number) {
          const candidates = grid.getCellCandidates([col, row]);

          for (const candidate of candidates) {
            appendMap(rowMap, candidate, [col, row]);
            appendMap(columnMap, candidate, [col, row]);
            if (hasBlocks) {
              appendMap(blockMap, candidate, [col, row]);
            }
          }
        }

        // Short circuit if the previously finished col has a hidden single
        if (row === grid.scale - 1) {
          mutation = checkForHiddenSingle(columnMap);
        }

        // Short circuit if the previouly finished block has a hidden single
        if (hasBlocks && !mutation) {
          if (
            (row + 1) % grid.blockScale === 0 &&
            (col + 1) % grid.blockScale === 0
          ) {
            mutation = checkForHiddenSingle(blockMap);
          }
        }
      }
      // Short circuit if the previously finished row has a hidden single
      if (!mutation) {
        mutation = checkForHiddenSingle(rowMap);
      }
    }

    return { technique: this.name, mutation };
  }
}
