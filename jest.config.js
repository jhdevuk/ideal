/* -----------------------------------
 *
 * Jest
 *
 * -------------------------------- */

module.exports = {
   testEnvironment: 'node',
   globals: { __DEV__: true },
   roots: ['<rootDir>'],
   collectCoverage: true,
   collectCoverageFrom: ['src/**/*.{ts,tsx}'],
   coverageDirectory: 'tests/coverage',
   moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
   },
   transform: {
      '^.+\\.tsx?$': 'ts-jest',
   },
};
