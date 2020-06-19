import path from 'path';
import { argv } from 'yargs';
import { IOptions } from '@/options';
import { runtimeRequire } from '@/utility/runtimeRequire';

/* -----------------------------------
 *
 * Default
 *
 * -------------------------------- */

const argumentOptions = {
   release: !!argv.release,
   outputPath: (argv.outputPath as string) || undefined,
   sourceMap: !!argv.sourceMap,
   cssModules: !!argv.cssModules,
   watch: !!argv.watch,
   watchPath: (argv.watchPath as string) || undefined,
   verbose: !!argv.verbose,
   pathAlias: argv.pathAlias as string,
   filePrefix: (argv.filePrefix as string) || undefined,
   includePath: (argv.includePath as string) || undefined,
   skipManifest: !!argv.skipManifest,
   manifestPath:
      ((argv.manifestPath || argv.outputPath) as string) || undefined,
};

/* -----------------------------------
 *
 * Load
 *
 * -------------------------------- */

function loadConfig(methodKey: string, sourcePath: string) {
   if (sourcePath.startsWith('--')) {
      sourcePath = undefined;
   }

   try {
      const { [methodKey]: localOptions = {} } = runtimeRequire(
         path.resolve('./ideal.config')
      );

      const result = buildConfig(sourcePath, localOptions);

      return result;
   } catch (error) {
      return { ...argumentOptions, sourcePath };
   }
}

/* -----------------------------------
 *
 * Build
 *
 * -------------------------------- */

function buildConfig(
   sourcePath: string,
   localOptions?: IOptions
): IOptions {
   const nonPrimary = ['skipManifest'];

   const argKeys = Object.keys(argumentOptions).filter((key) =>
      nonPrimary.indexOf(key)
   );

   const result = {
      ...localOptions,
      ...(sourcePath ? { sourcePath } : {}),
   };

   argKeys.forEach((key) => {
      const value = argumentOptions[key];

      if (value !== undefined) {
         result[key] = value;
      }
   });

   if (!result.manifestPath) {
      result.manifestPath = result.outputPath;
   }

   return result;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { loadConfig };
