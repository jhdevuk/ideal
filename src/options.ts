/* -----------------------------------
 *
 * IOptions
 *
 * -------------------------------- */

interface IOptions {
   outputPath: string;
   release: boolean;
   sourceMap: boolean;
   cssModules: boolean;
   watch: boolean;
   watchPath: string;
   verbose: boolean;
   pathAlias: string;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IOptions };
