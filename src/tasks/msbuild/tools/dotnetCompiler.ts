import { execFile } from 'child_process';
import msbuild from 'msbuild';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';
import { msbuildConfig } from './defaultConfig';
import { nugetArguments } from './nugetArguments';

/* -----------------------------------
 *
 * Compiler
 *
 * -------------------------------- */

function dotnetCompiler(options: IOptions) {
  return {
    nuget: nugetRestore(options),
    build: runMsbuild(options),
  };
}

/* -----------------------------------
 *
 * Nuget
 *
 * -------------------------------- */

function nugetRestore(options: IOptions) {
  return (path: string) =>
    new Promise((resolve, reject) => {
      const maxBuffer = 200 * 1024;

      const properties = nugetArguments(path, {
        nuget: msbuildConfig.nuget,
        maxBuffer,
      });

      execFile(
        msbuildConfig.nuget,
        properties,
        { maxBuffer },
        (error, stdout) => {
          if (stdout.trim()) {
            log.output('Nuget:', stdout);
          }

          if (error) {
            reject(error);

            return;
          }

          resolve();
        }
      );
    });
}

/* -----------------------------------
 *
 * MSBuild
 *
 * -------------------------------- */

function runMsbuild({ msbuildVersion, msbuildPackage }: IOptions) {
  const {
    targets,
    toolsVersion,
    configuration,
    errorsOnly,
    publishPath,
  } = msbuildConfig;

  return (path: string) =>
    new Promise((resolve, reject) => {
      const build = new msbuild(resolve);

      build.sourcePath = path;

      build.config('targets', targets);
      build.config('version', msbuildVersion || toolsVersion);
      build.config('configuration', configuration);

      if (errorsOnly) {
        build.overrideParams.push('/clp:ErrorsOnly');
      }

      if (!msbuildPackage) {
        build.build();

        return;
      }

      build.config('outputPath', publishPath);
      build.config('publishProfile', 'Staging');

      build.package();
    });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { dotnetCompiler };
