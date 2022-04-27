import { EcoledirecteLoginOptions, Session, Grades } from "../../../src";
import { getEcoledirecteTestAccount } from "./getEcoledirecteTestAccount";

const { username, password } = getEcoledirecteTestAccount();

test("Grades", async () => {
  const account = await new Session(
    new EcoledirecteLoginOptions({
      username,
      password,
    })
  ).login();
  if (!account.hasFeature("GRADES"))
    throw new Error("GRADES feature is not enabled on this account");
  await expect(account.getGrades()).resolves.toBeInstanceOf(Grades);
});
