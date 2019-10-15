module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/*.test.api.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.md?$': 'jest-raw-loader',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.md?$': 'jest-raw-loader',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  globals: {
    'ts-jest': {
      babelConfig: '<rootDir>/.babelrc',
    },
  },
};
