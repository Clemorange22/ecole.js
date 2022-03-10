import "dotenv/config";

export interface EcoledirecteTestAccount {
  username: string;
  password: string;
}

export function getEcoledirecteTestAccount(): EcoledirecteTestAccount {
  return process.env.ECOLEDIRECTE_TEST_USERNAME &&
    process.env.ECOLEDIRECTE_TEST_PASSWORD
    ? {
        username: process.env.ECOLEDIRECTE_TEST_USERNAME,
        password: process.env.ECOLEDIRECTE_TEST_PASSWORD,
      }
    : {
        username: "",
        password: "",
      };
}
