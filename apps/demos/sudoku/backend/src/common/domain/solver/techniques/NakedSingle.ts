import { Grid } from '@sudoku-backend/common/domain';

import { Technique, type TechniqueApplicationResult } from '../types';

export default class NakedSingle implements Technique {
  get name() {
    return 'Naked Single';
  }

  apply(grid: Grid): TechniqueApplicationResult {
    let mutation: TechniqueApplicationResult['mutation'];

    for (let cellIndex = 0; cellIndex < grid.size; cellIndex++) {
      const candidates = grid.getCellCandidates(cellIndex);
      if (candidates.length === 1) {
        mutation = grid.setCellNumber(cellIndex, candidates[0]);
        break;
      }
    }

    return { technique: this.name, mutation };
  }
}
