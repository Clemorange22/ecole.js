import { Session, EcoledirecteLoginOptions, Class } from "../../../src";
import { getEcoledirecteTestAccount } from "./getEcoledirecteTestAccount";

const { username, password } = getEcoledirecteTestAccount();

test("Class", () => {
  (async () => {
    const account = await new Session(
      new EcoledirecteLoginOptions({ username, password })
    ).login();
    expect(await account.getClass()).toBeInstanceOf(Class);
  })();
});
