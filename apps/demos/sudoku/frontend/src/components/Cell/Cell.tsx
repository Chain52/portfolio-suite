import { useCell } from '@sudoku-frontend/services';
import React from 'react';

interface CellProps {
  id: number;
}

export default function Cell({ id }: CellProps) {
  const { value } = useCell(id);
  return <div>{value}</div>;
}
