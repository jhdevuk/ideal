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
   sourcePath: null,
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
   autoFix: !!argv.autoFix,
};

/* -----------------------------------
 *
 * Load
 *
 * -------------------------------- */

function loadConfig(sourcePath: string, methodKey: string) {
   try {
      const { [methodKey]: localOptions = {} } = runtimeRequire(
         path.resolve('./ideal.config')
      );

      return { ...defaultOptions, ...localOptions, sourcePath };
   } catch (error) {
      return { ...defaultOptions, sourcePath };
   }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { loadConfig };
