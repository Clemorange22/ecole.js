import { getPronoteTestAccount } from ".";
import { Session, PronoteLoginOptions, Homework } from "../../../src";

const { url, username, password, cas } = getPronoteTestAccount();

test("Homework", () => {
  (async () => {
    const session = new Session(
      new PronoteLoginOptions({
        username,
        password,
        url,
        cas,
      })
    );

    const account = await session.login();
    if (!account.hasFeature("HOMEWORK"))
      throw new Error("HOMEWORK feature is not enabled on this account");
    const homework = await account.getHomework();
    expect(homework).toBeInstanceOf(Array);
    for (const h of homework) {
      expect(h).toBeInstanceOf(Homework);
    }
  })();
});
