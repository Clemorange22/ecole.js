import { EcoledirecteAccount } from "./EcoledirecteAccount";
import {
  EcoledirecteStudent,
  /*
  EcoledirecteTeacher,
  EcoledirecteStaff,
  EcoledirecteFamily,
  */
} from "./accounts";

import { Session as _Session } from "ecoledirecte.js";
import { Session, WrongCredentialsError } from "../..";

export class EcoledirecteLoginOptions {
  username: string;
  password: string;
  constructor({ username, password }: { username: string; password: string }) {
    this.username = username;
    this.password = password;
  }
}

export async function ecoledirecteLogin(
  session: Session
): Promise<EcoledirecteAccount> {
  const { username, password } = session.serviceLoginOptions;
  const _session = new _Session(username, password);
  const account = await _session.login().catch((error) => {
    if (error.code == 505 || error.message.startsWith("505"))
      throw new WrongCredentialsError("ecoledirecte");
    throw error;
  });

  switch (account.type) {
    case "student":
      return new EcoledirecteStudent(account, session);
    case "teacher":
      throw new Error("Unsupported account type");
    case "staff":
      throw new Error("Unsupported account type");
    case "family":
      throw new Error("Unsupported account type");
    default:
      throw new Error("Unknown account type");
  }
}
