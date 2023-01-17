/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { IHypermedia } from "../src/hyper";
import { Link, Hypermedia } from "../src/hyper";
import { HTTPMethod } from "../src/uri";
import nock from "nock";
import { LinkNotFoundError, InvalidAddressError } from "../src/exceptions";

describe("Hypermedia", () => {
  const updateLink = new Link("update", "http://localhost/users/1", HTTPMethod.PATCH);
  const selfLink = new Link("self", "http://localhost/users/1", HTTPMethod.GET);
  const deleteLink = new Link("delete", "http://localhost/users/1", HTTPMethod.DELETE);

  const notesLink = new Link("notes/create", "http://localhost/users/1/notes", HTTPMethod.GET);

  const links = [selfLink, updateLink, deleteLink, notesLink];

  it("should throw an error when passed an invalid address", async () => {
    const address = "invalid-address";
    await expect(Hypermedia.from(address)).rejects.toThrow("Invalid URL or endpoint: invalid-address");
  });

  describe("Hypermedia", () => {
    let hypermedia: Hypermedia;
    const address = new URL("http://localhost/hypermedia");

    beforeEach(async () => {
      nock("http://localhost/").get(address.pathname).reply(200, links);
      hypermedia = await Hypermedia.from(address.href);
    });

    it("should return all links", () => {
      const links = hypermedia.all();
      expect(links).toEqual(links);
    });

    it("should return a specific link", () => {
      const link = hypermedia.only("update");
      expect(link).toEqual(updateLink);
    });

    it("should throw error when trying to retrieve a non existing links", () => {
      expect(() => hypermedia.only("not-found")).toThrow(new LinkNotFoundError("Link with rel 'not-found' not found"));
    });

    it("should follow the link and return the data", async () => {
      nock("http://localhost/").delete("/users/1").reply(204, {});
      const data = await hypermedia.follow<IHypermedia>("delete");
      expect(data).toEqual({});
    });

    it("should throw an error if link not found when following a link", async () => {
      await expect(hypermedia.follow("not-found")).rejects.toThrow(LinkNotFoundError);
    });
  });
});
