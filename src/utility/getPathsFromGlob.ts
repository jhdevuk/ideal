/* -----------------------------------
 *
 * Paths
 *
 * -------------------------------- */

function getPathsFromGlob(globPath = '') {
   const paths = globPath
      .split('/')
      .filter((item) => !item.startsWith('*') && !item.startsWith('.'));

   const result = paths.map(
      (item, index) => `./${paths.slice(0, index + 1).join('/')}`
   );

   return result;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { getPathsFromGlob };
