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
   watch: !!argv.watch,
   watchPath: (argv.watchPath as string) || '',
   verbose: !!argv.verbose,
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

      return { ...defaultOptions, ...localOptions };
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
