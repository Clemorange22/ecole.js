import { getPronoteTestAccount } from "./getPronoteTestAccount";
import {
  Session,
  PronoteLoginOptions,
  WrongCredentialsError,
} from "../../../src";

const { url, username, password, cas } = getPronoteTestAccount();

test("Successful login", () => {
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

test("Wrong credentials login error", async () => {
  const session = new Session(
    new PronoteLoginOptions({
      username: "wrong",
      password: "wrong",
      url,
      cas,
    })
  );
  expect(session.login()).rejects.toThrow(new WrongCredentialsError("pronote"));
});
