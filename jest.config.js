/* eslint-disable @typescript-eslint/no-var-requires */
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  rootDir: '.',
  projects: ['<rootDir>/jest.config.js'],
  collectCoverageFrom: ['src/**/{!(app.module|index|main),}.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageReporters: ['lcovonly'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: tsjPreset.transform,
  testEnvironment: 'node',
  collectCoverage: true,
  forceExit: true,
  coverageDirectory: 'coverage',
  // setupFiles: ['./jest-setup-file.js'],
}
