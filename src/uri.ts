import { URL } from "url";

class InvalidAddressError extends Error {
  constructor(address: string) {
    super(`Invalid address: ${address}`);
    this.name = "InvalidAddressError";
  }
}

class URI {
  private url: URL;

  constructor(address: string) {
    try {
      this.url = new URL(address);
    } catch (error) {
      // What in the actual hell.... :(
      if (error !== null && typeof error === "object" && "code" in error && error?.code === "ERR_INVALID_URL") {
        throw new InvalidAddressError(address);
      }
      throw error;
    }
  }

  get href() {
    return this.url.toString();
  }

  get pathname() {
    return this.url.pathname;
  }
}

/**
 * @license
 * Copyright (c) 2018-present, Loomble Inc <opensource@loomble.com>
 * Copyright (c) 2018-preset, Jay Rylan <jay@jayrylan.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Included documentation is from "[HTTP request methods][MDN]" by
 * [Mozilla Contributors][Contributors] and licensed under
 * [CC-BY-SA 4.0][CC-BY-SA].
 *
 * [MDN]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 * [Contributors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods$history
 * [CC-BY-SA]: https://creativecommons.org/licenses/by-sa/4.0/legalcode
 * [GITHUB]: https://github.com/jrylan/http-method-enum/blob/master/src/index.ts
 */

/**
 * HTTP request methods.
 *
 * HTTP defines a set of request methods to indicate the desired action to be
 * performed for a given resource. Although they can also be nouns, these
 * request methods are sometimes referred as HTTP verbs. Each of them implements
 * a different semantic, but some common features are shared by a group of them:
 * e.g. a request method can be safe, idempotent, or cacheable.
 *
 * @public
 */
enum HTTPMethod {
  /**
   * The `CONNECT` method establishes a tunnel to the server identified by the
   * target resource.
   */
  CONNECT = "CONNECT",

  /**
   * The `DELETE` method deletes the specified resource.
   */
  DELETE = "DELETE",

  /**
   * The `GET` method requests a representation of the specified resource.
   * Requests using GET should only retrieve data.
   */
  GET = "GET",

  /**
   * The `HEAD` method asks for a response identical to that of a GET request,
   * but without the response body.
   */
  HEAD = "HEAD",

  /**
   * The `OPTIONS` method is used to describe the communication options for the
   * target resource.
   */
  OPTIONS = "OPTIONS",

  /**
   * The PATCH method is used to apply partial modifications to a resource.
   */
  PATCH = "PATCH",

  /**
   * The `POST` method is used to submit an entity to the specified resource,
   * often causing a change in state or side effects on the server.
   */
  POST = "POST",

  /**
   * The `PUT` method replaces all current representations of the target
   * resource with the request payload.
   */
  PUT = "PUT",

  /**
   * The `TRACE` method performs a message loop-back test along the path to the
   * target resource.
   */
  TRACE = "TRACE",
}

export { URI, HTTPMethod, InvalidAddressError };
