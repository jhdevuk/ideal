import { Readable } from 'stream';
import { renderSync } from 'node-sass';
import { streamToString, stringToStream } from '@/utility/streamHelpers';

/* -----------------------------------
 *
 * IConfig
 *
 * -------------------------------- */

interface IConfig {
   includePaths: string[];
   fileName: string;
   filePath: string;
   sourceMap?: boolean;
}

/* -----------------------------------
 *
 * Convert
 *
 * -------------------------------- */

async function convertSassFile(
   stream: Readable,
   { includePaths, fileName, filePath, sourceMap }: IConfig
) {
   try {
      const { css, map } = renderSync({
         data: await streamToString(stream),
         file: filePath,
         includePaths,
         outFile: `${fileName}.css`,
         sourceMap,
      });

      return {
         cssResult: stringToStream(css),
         mapOutput: map && stringToStream(map),
      };
   } catch (error) {
      error.file = `${fileName}.scss`;

      throw error;
   }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { convertSassFile };
