import { EcoledirecteLoginOptions, Session, Timetable } from "../../../src";
import { getEcoledirecteTestAccount } from "./getEcoledirecteTestAccount";

const { username, password } = getEcoledirecteTestAccount();

test("Timetable", async () => {
  const account = await new Session(
    new EcoledirecteLoginOptions({
      username,
      password,
    })
  ).login();
  if (!account.hasFeature("TIMETABLE"))
    throw new Error("TIMETABLE feature is not enabled on this account");
  const now = new Date(Date.now());
  const timetable = await account.getTimetable({
    startDate: now,
    endDate: new Date(now.setDate(now.getDate() + 1)),
  });
  expect(timetable).toBeInstanceOf(Timetable);
});
