import { Configuration } from 'webpack';

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
   filePrefix: string;
   includePath: string;
   localWebpackConfig?: (options: IOptions) => Configuration;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IOptions };
