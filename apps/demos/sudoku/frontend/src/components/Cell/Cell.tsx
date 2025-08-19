import { useContainerDimensions } from '@portfolio/ui';
import {
  toggleSelectCell,
  useAppDispatch,
  useCell
} from '@sudoku-frontend/services';
import clsx from 'clsx';
import React from 'react';

interface CellProps {
  id: number;
}

export default function Cell({ id }: CellProps) {
  const { value, isSelected, isGiven } = useCell(id);
  const dispatch = useAppDispatch();

  const { containerRef, dimensions } =
    useContainerDimensions<HTMLButtonElement>();

  const selectCellHandler = React.useCallback(
    () => dispatch(toggleSelectCell(id)),
    [dispatch, id]
  );

  return (
    <button
      ref={containerRef}
      onClick={selectCellHandler}
      className={clsx(
        isSelected &&
          'outline-2 outline-interactive border-interactive bg-highlight',
        !isSelected && 'border-black',
        isGiven && 'text-black',
        !isGiven && 'text-interactive',
        'border text-center align-middle justify-center items-center flex w-full h-full cursor-pointer hover:bg-highlight'
      )}
    >
      {value && (
        <span
          style={{ fontSize: `${dimensions.height - 4}px` }}
          className="text-5xl/0 font-mono"
        >
          {value}
        </span>
      )}
    </button>
  );
}
