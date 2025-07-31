import { useAppSelector } from '../app';
import { cellSelectors } from './slice';

export const useCell = (id: number) => {
  return useAppSelector((state) => cellSelectors.selectById(state, id));
};
