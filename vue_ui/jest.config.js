module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.ts?$': 'ts-jest',
      '^.+\\.svg$': 'jest-transform-stub',
      '^.+\\.png$': 'jest-transform-stub',
    },
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
      },
    moduleNameMapper: {
      '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
      '^@/assets/(.*)$': '<rootDir>/src/assets/$1',
      '^@/__tests__/(.*)$': '<rootDir>/__tests__/$1',
      '\\.(svg|png)$': '<rootDir>/__tests__/mocks/imageMock.js',
    },
    testPathIgnorePatterns: [
      "/mocks/"
    ],
    // collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,ts,vue}', '!**/node_modules/**'],
    coverageReporters: ['json', 'lcov', 'text'],
  };
