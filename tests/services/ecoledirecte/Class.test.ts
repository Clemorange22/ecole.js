import { Session, EcoledirecteLoginOptions, Class } from "../../../src";
import { getEcoledirecteTestAccount } from "./getEcoledirecteTestAccount";

const { username, password } = getEcoledirecteTestAccount();

test("Class", async () => {
  const account = await new Session(
    new EcoledirecteLoginOptions({ username, password })
  ).login();
  await expect(account.getClass()).resolves.toBeInstanceOf(Class);
});
