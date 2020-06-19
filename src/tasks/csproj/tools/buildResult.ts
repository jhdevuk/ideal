import { ReadStream } from 'fs';
import path from 'path';
import libxml from 'libxmljs';
import { stringToStream } from '@/utility/streamHelpers';
import { parseXMLDoc } from './parseXMLDoc';
import { config } from './config';

/* -----------------------------------
 *
 * Build
 *
 * -------------------------------- */

async function buildResult(
   manifestPath: string,
   manifest: object,
   data: ReadStream
) {
   const xmlDoc = await parseXMLDoc(data);
   const fileNames = Object.keys(manifest);

   fileNames.forEach((file) => {
      const element: any = new libxml.Element(xmlDoc, config.element);

      element.attr(config.attribute, path.join(manifestPath, file));

      xmlDoc.get(config.xpath, { xmlns: config.xmlns }).addChild(element);
   });

   return stringToStream(xmlDoc.toString());
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { buildResult };
