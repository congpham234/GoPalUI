module.exports = {
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'node',
  testRegex: '/tst/.*\\.(test|spec)?\\.(ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['!**/node_modules/**', '!**/build/**'],
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  // coverageThreshold: {
  //   global: {
  //     functions: 90,
  //     lines: 90,
  //   },
  // },
  testTimeout: 10000,
}
