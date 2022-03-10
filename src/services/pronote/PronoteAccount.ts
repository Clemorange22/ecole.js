import { PronoteAccountTypeName, PronoteStudentSession } from "pronote-api";
import { pronoteCAS, PronoteLoginOptions } from ".";
import { Session } from "../..";
import { BaseAccount } from "../../BaseAccount";
import { PronoteStudent } from "./accounts";

export type PronoteAccount = PronoteStudent;

export class PronoteBaseAccount extends BaseAccount {
  private _username: string;
  private _password: string;
  private _url: string;
  private _cas?: pronoteCAS;

  type: PronoteAccountTypeName;
  _account: PronoteStudentSession;
  constructor(_account: PronoteStudentSession, session: Session) {
    super(session, "pronote");
    const { username, password, url, cas } =
      session.serviceLoginOptions as PronoteLoginOptions;
    this._username = username;
    this._password = password;
    this._url = url;
    this._cas = cas;

    this.type = _account.type.name;

    this._account = _account;
  }
}
