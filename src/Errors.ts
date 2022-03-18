import { serviceName } from ".";

export class WrongCredentialsError extends Error {
  constructor(serviceName: serviceName) {
    super(`Wrong credentials error raised while login to ${serviceName}`);
    this.name = "WrongCredentialsError";
  }
}
