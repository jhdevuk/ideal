import { ReadStream } from 'fs';
import libxml from 'libxmljs';
import { stringToStream } from '@/utility/streamHelpers';
import { parseXMLDoc } from './parseXMLDoc';
import { config } from './config';

/* -----------------------------------
 *
 * Build
 *
 * -------------------------------- */

async function buildResult(manifest: object, data: ReadStream) {
   const xmlDoc = await parseXMLDoc(data);
   const fileNames = Object.keys(manifest);

   fileNames.forEach((file) => {
      const element: any = new libxml.Element(xmlDoc, config.element);

      element.attr(config.attribute, file);

      xmlDoc.get(config.xpath, { xmlns: config.xmlns });
   });

   return stringToStream(xmlDoc.toString());
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { buildResult };
