class InvalidAddressError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidAddressError";
  }
}

class LinkNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LinkNotFoundError";
  }
}

export { InvalidAddressError, LinkNotFoundError };
