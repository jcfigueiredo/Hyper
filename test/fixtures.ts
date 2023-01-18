import { Link } from "../src/hyper";
import { HTTPMethod } from "../src/uri";

const updateLink = new Link("update", "http://localhost/users/1", HTTPMethod.PATCH);
const selfLink = new Link("self", "http://localhost/users/1", HTTPMethod.GET);
const deleteLink = new Link("delete", "http://localhost/users/1", HTTPMethod.DELETE);

const notesLink = new Link("notes/create", "http://localhost/users/1/notes", HTTPMethod.GET);

export const links = [selfLink, updateLink, deleteLink, notesLink];
