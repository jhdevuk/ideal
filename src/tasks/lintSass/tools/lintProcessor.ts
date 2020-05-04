import stylelint, { LinterResult } from 'stylelint';
import { Readable } from 'stream';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Process
 *
 * -------------------------------- */

function lintProcessor({ sourcePath, autoFix }: IOptions) {
   return async (data: Readable, path: string): Promise<LinterResult> => {
      const result = await stylelint.lint({
         files: path,
         fix: autoFix,
         formatter: 'verbose',
      });

      return result;
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { lintProcessor };
