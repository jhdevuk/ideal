import { execFile } from 'child_process';
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
      const args = nugetArguments(path, {});

      execFile(
        msbuildConfig.nuget,
        args,
        { maxBuffer: 200 * 1024 },
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

function runMsbuild(options: IOptions) {
  return (path: string) => {
    //
  };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { dotnetCompiler };
