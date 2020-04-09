/* -----------------------------------
 *
 * IOptions
 *
 * -------------------------------- */

interface IOptions {
   outputPath: string;
   release: boolean;
   sourceMap: boolean;
   watch: boolean;
   watchPath: string;
   verbose: boolean;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IOptions };
