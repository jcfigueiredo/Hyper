import type * as jest from "jest";

const config: jest.Config = {
  clearMocks: true,

  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  modulePathIgnorePatterns: ["./dist/", "./test/mocks.ts"],
  coveragePathIgnorePatterns: ["./test/mocks.ts"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default config;
