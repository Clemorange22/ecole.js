import { EcoledirecteAccount, PronoteAccount } from "./services/";

export type Account = EcoledirecteAccount | PronoteAccount;

export type accountType = "student" | "family" | "teacher" | "staff";
