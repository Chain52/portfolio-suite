export const arrayFrom0toN = <T = number>(
  length: number,
  map: (i: number) => T
): Array<T> => {
  return Array.from({ length }, (_, i) => (map ? map(i) : (i as T)));
};
