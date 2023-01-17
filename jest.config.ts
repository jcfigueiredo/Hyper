import type * as jest from 'jest';

const config: jest.Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    modulePathIgnorePatterns: ["./dist/", "./test/mocks.ts"],
    coveragePathIgnorePatterns: ["./test/mocks.ts"],
  }

export default config;