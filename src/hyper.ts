/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from "axios";
import { BadRequest } from "@tsed/exceptions";
import type { HTTPMethod } from "../src/uri";

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
}

interface IHypermedia {
  links: ILink[];
}

class Hypermedia implements IHypermedia {
  links: ILink[];
  uri: URL;

  private constructor(uri: URL, links: ILink[]) {
    this.uri = uri;
    this.links = links;
  }

  public static async from(address: string): Promise<Hypermedia> {
    let url: URL;
    try {
      url = new URL(address);
    } catch (error) {
      throw new BadRequest(`Invalid URL or endpoint: ${address}`);
    }
    const response = await axios.get<ILink[]>(url.href);
    return new Hypermedia(url, response.data);
  }
  public getLinks(): ILink[] {
    return this.links;
  }

  public async follow(rel: string): Promise<any> {
    const link = this.only(rel);
    if (!link) {
      throw new BadRequest(`Link with rel ${rel} not found`);
    }
    const url = new URL(link.href);
    const response = await axios({
      method: link.method,
      url: url.href,
    });
    return response.data;
  }

  public async chain(rel: string): Promise<Hypermedia> {
    const link = this.only(rel);
    if (!link) {
      throw new BadRequest(`Link with rel ${rel} not found`);
    }
    const url = new URL(link.href);
    const response = await axios({
      method: link.method,
      url: url.href,
    });
    return new Hypermedia(url, response.data.links);
  }
  public all(): ILink[] {
    return this.links;
  }

  public only(rel: string): ILink | undefined {
    return this.links.find((link: ILink) => link.rel === rel);
  }
}
export { Hypermedia, Link };
export type { IHypermedia, ILink };
