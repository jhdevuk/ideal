import path from 'path';
import { argv } from 'yargs';
import { IOptions } from '@/options';
import { runtimeRequire } from '@/utility/runtimeRequire';

/* -----------------------------------
 *
 * Default
 *
 * -------------------------------- */

const defaultOptions: IOptions = {
   release: !!argv.release,
   outputPath: (argv.outputPath as string) || './dist',
   sourceMap: !!argv.sourceMap,
   cssModules: !!argv.cssModules,
   watch: !!argv.watch,
   watchPath: (argv.watchPath as string) || null,
   verbose: !!argv.verbose,
   pathAlias: (argv.pathAlias as string) || './src',
   filePrefix: (argv.filePrefix as string) || null,
   includePath: (argv.includePath as string) || null,
   manifestPath:
      ((argv.manifestPath || argv.outputPath) as string) || null,
};

/* -----------------------------------
 *
 * Load
 *
 * -------------------------------- */

function loadConfig(methodKey: string) {
   try {
      const { [methodKey]: localOptions = {} } = runtimeRequire(
         path.resolve('./ideal.config')
      );

      const result = {
         ...defaultOptions,
         ...localOptions,
      };

      return result;
   } catch (error) {
      return defaultOptions;
   }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { loadConfig };
