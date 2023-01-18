// include jest config to setup MSW in the test environment
// https://mswjs.io/docs/getting-started/integrate/node
// Path: jest.setup.ts
import { server } from "./test/mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared as a part of our tests.
// Most importantly, this removes any request handlers that we may add during the tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
