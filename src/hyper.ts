/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HTTPMethod, InvalidAddressError } from "../src/uri";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { LinkNotFoundError } from "./exceptions";

interface ILink {
  rel: string;
  href: string;
  method: HTTPMethod;
}

class Link {
  rel: string;
  href: string;
  method: HTTPMethod;

  constructor(rel: string, href: string, method: HTTPMethod) {
    this.rel = rel;
    this.href = href;
    this.method = method;
  }

  public static get Null(): ILink {
    return new Link("null-link", "#", HTTPMethod.GET);
  }
}

interface IHypermedia {
  links: ILink[];
}

class Hypermedia implements IHypermedia {
  links: ILink[];
  uri: URL;
  lastLinkFollowed: ILink;

  private constructor(uri: URL, links: ILink[]) {
    this.uri = uri;
    this.links = links;
    this.lastLinkFollowed = Link.Null;
  }

  public static async from(address: string): Promise<Hypermedia> {
    let url: URL;
    try {
      url = new URL(address);
    } catch (error) {
      throw new InvalidAddressError(`Invalid URL or endpoint: ${address}`);
    }

    const response = await axios.get<ILink[]>(url.href);
    return new Hypermedia(url, response.data);
  }

  private async fetchData<T = object>(rel: string): Promise<AxiosResponse> {
    const link = this.only(rel);

    this.lastLinkFollowed = link;

    const url = new URL(link.href);
    return await axios<T>({ method: link.method, url: url.href });
  }

  public async follow<T = object>(rel: string): Promise<T> {
    const response = await this.fetchData<T>(rel);
    return response.data;
  }

  public all(): ILink[] {
    return this.links;
  }

  public only(rel: string): ILink {
    // return this.links.find((link: ILink) => link.rel === rel) ?? Link.Null;
    const link = this.links.find((link: ILink) => link.rel === rel);
    if (link === undefined) throw new LinkNotFoundError(`Link with rel '${rel}' not found`);
    return link;
  }
}
export { Hypermedia, Link };
export type { IHypermedia, ILink };
