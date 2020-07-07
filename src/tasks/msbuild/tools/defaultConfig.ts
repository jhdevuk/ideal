/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

const msbuildConfig = {
  configuration: 'Debug',
  nuget: 'C:/tools/nuget.exe',
  platform: 'Any CPU',
  targets: ['Build'],
  toolsVersion: '15.0',
  errorsOnly: true,
  publishPath: 'C:\\temp\\vc-build',
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { msbuildConfig };
