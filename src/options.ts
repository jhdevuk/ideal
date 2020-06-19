import { Configuration } from 'webpack';

/* -----------------------------------
 *
 * IOptions
 *
 * -------------------------------- */

interface IOptions {
   sourcePath: string;
   outputPath: string;
   release: boolean;
   sourceMap: boolean;
   cssModules: boolean;
   watch: boolean;
   watchPath?: string;
   verbose: boolean;
   pathAlias: string;
   filePrefix?: string;
   includePath?: string;
   skipManifest: boolean;
   manifestPath: string;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IOptions };
