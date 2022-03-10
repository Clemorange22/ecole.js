import { EcoledirecteLoginOptions, Session } from "../../../src";
import { getEcoledirecteTestAccount } from "./getEcoledirecteTestAccount";

const { username, password } = getEcoledirecteTestAccount();

test("Login", () => {
  async () => {
    const session = new Session(
      new EcoledirecteLoginOptions({
        username,
        password,
      })
    );
    expect(await session.login()).toBeTruthy();
  };
});
