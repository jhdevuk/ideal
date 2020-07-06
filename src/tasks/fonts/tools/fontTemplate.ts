/* -----------------------------------
 *
 * IDate
 *
 * -------------------------------- */

interface IData {
  familyName: string;
  fileName: string;
  encodedData: string;
}

/* -----------------------------------
 *
 * Template
 *
 * -------------------------------- */

function fontTemplate({ familyName, encodedData, fileName }: IData) {
  return `
    @font-face {
      font-family: '${familyName}';
      src: url(data:application/font-woff;charset=utf-8;base64,${encodedData}) format('woff');
      font-style: normal;
    }
  `;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { fontTemplate };
