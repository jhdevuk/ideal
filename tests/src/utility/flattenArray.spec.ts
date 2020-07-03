/* -----------------------------------
 *
 * Subject
 *
 * -------------------------------- */

import { flattenArray } from '@/utility/flattenArray';

/* -----------------------------------
 *
 * Test
 *
 * -------------------------------- */

describe('Utility:flattenArray', () => {
  const testArray = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  it('can faltten a two dimensional array', () => {
    const result = flattenArray(testArray);

    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
