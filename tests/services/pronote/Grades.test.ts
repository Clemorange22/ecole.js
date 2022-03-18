import { getPronoteTestAccount } from "./getPronoteTestAccount";
import { PronoteLoginOptions, Session, Grades } from "../../../src";

const { url, username, password, cas } = getPronoteTestAccount();

test("Grades", () => {
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
    if (!account.hasFeature("GRADES")) {
      throw new Error("GRADES feature is not enabled on this account");
    }
    const grades = await account.getGrades();
    expect(grades).toBeInstanceOf(Grades);
  })();
});
