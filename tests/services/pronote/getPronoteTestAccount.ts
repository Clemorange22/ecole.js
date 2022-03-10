import "dotenv/config";
import { pronoteCAS } from "../../../src";

export interface PronoteTestAccount {
  url: string;
  username: string;
  password: string;
  cas?: pronoteCAS;
}

export function getPronoteTestAccount(): PronoteTestAccount {
  return {
    url:
      process.env.PRONOTE_TEST_URL ||
      "https://demo.index-education.net/pronote/",
    username: process.env.PRONOTE_TEST_USERNAME || "demonstration",
    password: process.env.PRONOTE_TEST_PASSWORD || "pronotevs",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cas: process.env.PRONOTE_TEST_CAS,
  };
}
