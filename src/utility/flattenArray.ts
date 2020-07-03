/* -----------------------------------
 *
 * Flatten
 *
 * -------------------------------- */

function flattenArray<T>(arrays: T[]): T {
  return [].concat.apply([], arrays);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { flattenArray };
