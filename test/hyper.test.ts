/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequest } from "@tsed/exceptions";
import { Link, Hypermedia } from "../src/hyper";
import { HTTPMethod } from "../src/uri";
import nock from "nock";

describe("Hypermedia", () => {
  const updateLink = new Link("update", "http://localhost/users/1", HTTPMethod.PATCH);
  const selfLink = new Link("self", "http://localhost/users/1", HTTPMethod.GET);
  const deleteLink = new Link("delete", "http://localhost/users/1", HTTPMethod.DELETE);

  const notesLink = new Link("notes/create", "http://localhost/users/1/notes", HTTPMethod.GET);

  const links = [selfLink, updateLink, deleteLink, notesLink];

  it("should return links", async () => {
    const address = new URL("http://localhost/hypermedia");

    nock("http://localhost/").get(address.pathname).reply(200, links);
    const hypermedia = await Hypermedia.from(address.href);
    expect(hypermedia.getLinks()).toEqual(links);
  });

  it("should throw an error when passed an invalid address", () => {
    const address = "invalid-address";
    expect(Hypermedia.from(address)).rejects.toThrowError(BadRequest);
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

    it("should return undefined if a specific link is not found", () => {
      const link = hypermedia.only("not-found");
      expect(link).toBeUndefined();
    });

    it("should follow the link and return the data", async () => {
      nock("http://localhost/").delete("/users/1").reply(204);
      const data = await hypermedia.follow("delete");
      expect(data).toEqual("");
    });

    it("should throw an error if link not found", async () => {
      await expect(hypermedia.follow("not-found")).rejects.toThrowError(BadRequest);
    });

    it("should chain multiple follow calls", async () => {
      nock("http://localhost")
        .get("/users/1/notes")
        .reply(200, { notes: ["note1", "note2"] });

      const notes = await hypermedia.follow("notes/create");
      expect(notes).toEqual({ notes: ["note1", "note2"] });
    });

    it("should throw an error if link not found", async () => {
      await expect(hypermedia.chain("not-found")).rejects.toThrowError(BadRequest);
    });
  });
});
