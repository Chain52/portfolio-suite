import { useAppSelector } from '../app';

export const useGrid = () => useAppSelector((state) => state.grid);
