import { ecoledirecteLogin, EcoledirecteLoginOptions } from "./ecoledirecte";

import { pronoteLogin, PronoteLoginOptions } from "./pronote";

export * from "./getService";
export * from "./ecoledirecte";
export * from "./pronote";

export interface service {
  name: serviceName;
  login: serviceLogin;
}

export type serviceName = "ecoledirecte" | "pronote";

export type serviceLogin = typeof ecoledirecteLogin | typeof pronoteLogin;

export type ServiceLoginOptions =
  | EcoledirecteLoginOptions
  | PronoteLoginOptions;
