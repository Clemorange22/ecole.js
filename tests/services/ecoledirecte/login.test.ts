import {
  EcoledirecteLoginOptions,
  Session,
  WrongCredentialsError,
} from "../../../src";
import { getEcoledirecteTestAccount } from "./getEcoledirecteTestAccount";

const { username, password } = getEcoledirecteTestAccount();

test("Successful login", async () => {
  const session = new Session(
    new EcoledirecteLoginOptions({
      username,
      password,
    })
  );
  await expect(session.login()).resolves.toBeTruthy();
});

test("Wrong credentials error", async () => {
  const session = new Session(
    new EcoledirecteLoginOptions({
      username: "wrong",
      password: "wrong",
    })
  );
  await expect(session.login()).rejects.toThrow(
    new WrongCredentialsError("ecoledirecte").message
  );
});
