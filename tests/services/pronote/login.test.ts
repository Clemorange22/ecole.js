import { getPronoteTestAccount } from "./getPronoteTestAccount";
import { Session, PronoteLoginOptions } from "../../../src";

const { username, password, url, cas } = getPronoteTestAccount();

test("Login", () => {
  const session = new Session(
    new PronoteLoginOptions({
      username,
      password,
      url,
      cas,
    })
  );
  expect(session.login()).resolves.toBeTruthy();
});
