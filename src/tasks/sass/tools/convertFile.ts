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
}

/* -----------------------------------
 *
 * Convert
 *
 * -------------------------------- */

async function convertFile(
   stream: Readable,
   { sourcePath, fileName }: IConfig
) {
   try {
      const { css, map } = renderSync({
         data: await streamToString(stream),
         includePaths: getPathsFromGlob(sourcePath),
      });

      return {
         cssValue: stringToStream(css),
         sourceMap: map,
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
