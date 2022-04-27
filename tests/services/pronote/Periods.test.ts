import { getPronoteTestAccount } from ".";
import { Session, PronoteLoginOptions, Period } from "../../../src";

const { url, username, password, cas } = getPronoteTestAccount();

test("Periods", async () => {
  const account = await new Session(
    new PronoteLoginOptions({
      username,
      password,
      url,
      cas,
    })
  ).login();

  const periods = await account.getPeriods();

  expect(periods).toBeInstanceOf(Array);

  for (const period of periods) {
    expect(period).toBeInstanceOf(Period);
  }
});
