import { ReadStream } from 'fs';
import libxml from 'libxmljs';
import { streamToString } from '@/utility/streamHelpers';

/* -----------------------------------
 *
 * Parse
 *
 * -------------------------------- */

async function parseXMLDoc(data: ReadStream) {
  const xmlContents = await streamToString(data);

  return libxml.parseXml(xmlContents);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { parseXMLDoc };
