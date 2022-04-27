import { getPronoteTestAccount } from "./getPronoteTestAccount";
import {
  Session,
  PronoteLoginOptions,
  WrongCredentialsError,
} from "../../../src";

const { url, username, password, cas } = getPronoteTestAccount();

test("Successful login", async () => {
  const session = new Session(
    new PronoteLoginOptions({
      username,
      password,
      url,
      cas,
    })
  );
  await expect(session.login()).resolves.toBeTruthy();
});

test("Wrong credentials login error", async () => {
  const session = new Session(
    new PronoteLoginOptions({
      username: "wrong",
      password: "wrong",
      url,
      cas,
    })
  );
  await expect(session.login()).rejects.toBe(
    new WrongCredentialsError("pronote")
  );
});
