import { Link, Hypermedia } from "../src/hyper";
import { HTTPMethod } from "../src/uri";

import { LinkNotFoundError } from "../src/exceptions";
import { links } from "./fixtures";

describe("Hypermedia", () => {
  it("should throw an error when passed an invalid address", async () => {
    const address = "invalid-address";
    await expect(Hypermedia.from(address)).rejects.toThrow("Invalid URL or endpoint: invalid-address");
  });

  describe("Hypermedia", () => {
    let hypermedia: Hypermedia;
    const address = new URL("http://localhost/hypermedia");

    beforeEach(async () => {
      hypermedia = await Hypermedia.from(address.href);
    });

    it("should return all links", () => {
      const links = hypermedia.all();
      expect(links).toEqual(links);
    });

    it("should return a specific link", () => {
      const link = hypermedia.only("update");
      expect(link).toEqual(links.find((link) => link.rel === "update"));
    });

    it("should throw error when trying to retrieve a non existing links", () => {
      expect(() => hypermedia.only("not-found")).toThrow(new LinkNotFoundError("Link with rel 'not-found' not found"));
    });

    it("should follow the link and return the data", async () => {
      const data = await hypermedia.follow<Hypermedia>("delete");
      expect(data).toEqual({});
    });

    it("should throw an error if link not found when following a link", async () => {
      await expect(hypermedia.follow("not-found")).rejects.toThrow(LinkNotFoundError);
    });
  });
});
