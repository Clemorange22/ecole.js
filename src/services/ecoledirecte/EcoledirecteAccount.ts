import { Session } from "../../";
import { BaseAccount } from "../../BaseAccount";
import {
  EcoledirecteStudent,
  /*
  EcoledirecteFamily,
  EcoledirecteTeacher,
  EcoledirecteStaff,
  */
} from "./accounts";

import {
  Session as _Session,
  Student as _Student,
  Family as _Family,
  Teacher as _Teacher,
  Staff as _Staff,
} from "ecoledirecte.js";

type _Account = _Student | _Family | _Teacher | _Staff;

export type EcoledirecteAccount = EcoledirecteStudent;
/*
  | EcoledirecteFamily
  | EcoledirecteTeacher
  | EcoledirecteStaff;
  */

export type EcoledirecteAccountType =
  | "student"
  | "family"
  | "teacher"
  | "staff";

export class BaseEcoledirecteAccount extends BaseAccount {
  private _username: string;
  private _password: string;
  _account: _Account;
  public type: EcoledirecteAccountType;

  constructor(account: _Account, session: Session) {
    super(session, "ecoledirecte");
    this._username = session.serviceLoginOptions.username;
    this._password = session.serviceLoginOptions.password;
    this.type = account.type;

    this._account = account;
  }

  async reconnect(): Promise<void> {
    //same credentials will return same account
    this._account = await new _Session(this._username, this._password).login();
  }
}
