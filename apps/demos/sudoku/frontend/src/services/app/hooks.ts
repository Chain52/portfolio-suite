import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@sudoku-frontend/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
