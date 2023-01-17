import { URI, InvalidAddressError } from "../src/uri";

describe("The URI", () => {
  it("should extract the properties of a valid URI", () => {
    const uri = new URI("http://user:pass@example.com:8080/path?query=string#fragment");

    // TODO: Fix it so it's semantically correct.
    // expect(uri.url.toString()).toBe('http://user:pass@example.com:8080/path?query=string#fragment');
    expect(uri.href).toBe("http://user:pass@example.com:8080/path?query=string#fragment");
    expect(uri.pathname).toBe("/path");
  });

  it("should throw an InvalidAddressError for an invalid URI", () => {
    expect(() => new URI("invalid")).toThrowError(InvalidAddressError);
  });
});
