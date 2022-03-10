import { Session, EcoledirecteLoginOptions, Period } from "../../../src";
import { getEcoledirecteTestAccount } from "./getEcoledirecteTestAccount";

const { username, password } = getEcoledirecteTestAccount();

test("Periods", async () => {
  const account = await new Session(
    new EcoledirecteLoginOptions({ username, password })
  ).login();

  const periods = await account.getPeriods();

  expect(periods).toBeInstanceOf(Array);

  for (const period of periods) {
    expect(period).toBeInstanceOf(Period);
  }
});
