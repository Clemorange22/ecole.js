import { getPronoteTestAccount } from ".";
import { Session, PronoteLoginOptions, Class } from "../../../src";

const { url, username, password, cas } = getPronoteTestAccount();

test("Class", async () => {
  const account = await new Session(
    new PronoteLoginOptions({
      username,
      password,
      url,
      cas,
    })
  ).login();

  await expect(account.getClass()).resolves.toBeInstanceOf(Class);
});
