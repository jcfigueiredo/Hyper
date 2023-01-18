// src/mocks/handlers.js
import "whatwg-fetch";
import type { RestRequest } from "msw";
import { rest } from "msw";
import { links } from "../fixtures";

export const handlers = [
  rest.get("http://localhost/hypermedia", (req, res, ctx) => {
    log(req);
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(links),
    );
  }),

  rest.get("http://localhost/users/1", (req, res, ctx) => {
    log(req);
    return res(ctx.status(200), ctx.json({}));
  }),

  rest.delete("http://localhost/users/1", (req, res, ctx) => {
    log(req);
    return res(ctx.status(202), ctx.json({}));
  }),
];

function log(req: RestRequest) {
  return;
  console.log(`Request intercepted: ${req.url.href} /  ${req.method}`);
}
