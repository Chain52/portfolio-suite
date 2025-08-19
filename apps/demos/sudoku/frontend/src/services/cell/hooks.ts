import { useAppSelector } from '../app';
import { cellsSelectors } from './slice';

export const useCell = (id: number) => {
  return useAppSelector((state) => cellsSelectors.selectById(state, id));
};
