import { getPronoteTestAccount } from ".";
import { Session, PronoteLoginOptions, Class } from "../../../src";

const { username, password, url, cas } = getPronoteTestAccount();

test("Class", () => {
  (async () => {
    const account = await new Session(
      new PronoteLoginOptions({
        username,
        password,
        url,
        cas,
      })
    ).login();

    expect(await account.getClass()).toBeInstanceOf(Class);
  })();
});
