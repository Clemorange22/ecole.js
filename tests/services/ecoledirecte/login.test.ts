import {
  EcoledirecteLoginOptions,
  Session,
  WrongCredentialsError,
} from "../../../src";
import { getEcoledirecteTestAccount } from "./getEcoledirecteTestAccount";

const { username, password } = getEcoledirecteTestAccount();

test("Successful login", () => {
  async () => {
    const session = new Session(
      new EcoledirecteLoginOptions({
        username,
        password,
      })
    );
    expect(await session.login()).toBeTruthy();
  };
});

test("Wrong credentials error", () => {
  const session = new Session(
    new EcoledirecteLoginOptions({
      username: "wrong",
      password: "wrong",
    })
  );
  expect(session.login()).rejects.toThrow(WrongCredentialsError);
});
