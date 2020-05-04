import { Result, ResultMessage } from 'postcss';
import { Transform } from 'stream';
import { stringToStream } from '@/utility/streamHelpers';

/* -----------------------------------
 *
 * Emit
 *
 * -------------------------------- */

function emitFile(resolve: any) {
   return new Transform({
      objectMode: true,
      transform: ({ css, messages }: Result) =>
         resolve({
            cssValue: stringToStream(css),
            cssModule: cssModule(messages),
         }),
   });
}

/* -----------------------------------
 *
 * Modules
 *
 * -------------------------------- */

function cssModule(messages: ResultMessage[]) {
   const pluginResult = messages.find(
      (item) => item.plugin === 'postcss-modules'
   );

   const jsonResult = pluginResult?.exportTokens;

   if (!jsonResult) {
      return undefined;
   }

   return stringToStream(JSON.stringify(jsonResult));
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { emitFile };
