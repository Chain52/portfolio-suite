import z4 from 'zod/v4';

/**
 * Number: cell number
 *    Ex. cell[0,0] = 1
 *
 * Note: list of possible numbers
 *    Ex. cell[0,0] = {1, 2, 3, or 4}
 *
 * WeakLink: Implied cells
 *    Ex. (cell[0,0] = 1 XOR cell[0,2] = 1) XOR (cell[0,0] ≠ 1 AND cell[0,2] ≠ 1)
 *        Either cell[0,0] or cell[0,2] or neither is 1
 *
 * StrongLink: Exclusive cells
 *    Ex. cell[0,0] = 1 XOR cell[0,2] = 1
 *        Either cell[0,0] or cell[0,2] must be 1
 */
export const GridMutationType = Object.freeze({
  Number: 'number',
  Note: 'note',
  WeakLink: 'weakLink',
  StrongLink: 'strongLink'
});

export const GridMutationTypeSchema = z4.enum(GridMutationType);
export type GridMutationType = z4.infer<typeof GridMutationTypeSchema>;
