import { ServiceLoginOptions, service } from ".";

import { ecoledirecteLogin, EcoledirecteLoginOptions } from "./ecoledirecte";
import { pronoteLogin, PronoteLoginOptions } from "./pronote";

export function getService(serviceLoginOptions: ServiceLoginOptions): service {
  if (serviceLoginOptions instanceof EcoledirecteLoginOptions) {
    return {
      name: "ecoledirecte",
      login: ecoledirecteLogin,
    };
  } else if (serviceLoginOptions instanceof PronoteLoginOptions) {
    return {
      name: "pronote",
      login: pronoteLogin,
    };
  } else {
    throw new Error("Wrong service options");
  }
}
