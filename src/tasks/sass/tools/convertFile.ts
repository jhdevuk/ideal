import { Readable } from 'stream';
import { renderSync } from 'node-sass';
import { getPathsFromGlob } from '@/utility/getPathsFromGlob';
import { streamToString, stringToStream } from '@/utility/streamHelpers';

/* -----------------------------------
 *
 * IConfig
 *
 * -------------------------------- */

interface IConfig {
   sourcePath: string;
   fileName: string;
   sourceMap?: boolean;
}

/* -----------------------------------
 *
 * Convert
 *
 * -------------------------------- */

async function convertFile(
   stream: Readable,
   { sourcePath, fileName, sourceMap }: IConfig
) {
   try {
      const { css, map } = renderSync({
         data: await streamToString(stream),
         includePaths: getPathsFromGlob(sourcePath),
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

export { convertFile };
