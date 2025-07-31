import React from 'react';

import { useGrid } from '@sudoku-frontend/services';
import { LoadStatus } from '@sudoku-frontend/constants';
import { Cell } from '../Cell';

export interface GridProps {}

export default function Grid({}: GridProps) {
  const { status, cells } = useGrid();

  if (status === LoadStatus.Idle) {
    // Window to start new game.

    return <div>Grid Idle Placeholder</div>;
  }

  return cells.map(({ id }) => <Cell id={id} />);
}
