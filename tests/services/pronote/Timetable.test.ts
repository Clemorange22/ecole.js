import { getPronoteTestAccount } from "./getPronoteTestAccount";
import { Session, PronoteLoginOptions, Timetable } from "../../../src";

const { url, username, password, cas } = getPronoteTestAccount();

test("Timetable", async () => {
  const session = new Session(
    new PronoteLoginOptions({
      username,
      password,
      url,
      cas,
    })
  );

  const account = await session.login();
  if (!account.hasFeature("TIMETABLE")) {
    throw new Error("TIMETABLE feature is not enabled on this account");
  }

  const now = new Date(Date.now());
  const timetable = await account.getTimetable({
    startDate: now,
    endDate: new Date(now.setDate(now.getDate() + 1)),
  });
  expect(timetable).toBeInstanceOf(Timetable);
});
