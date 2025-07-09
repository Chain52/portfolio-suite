/** @type {import('jest').Config} */
export default {
  verbose: true,
  transform: {
    '^.+\\.ts$': 'babel-jest'
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@sudoku-backend/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/tests/**/*.test.ts']
};
