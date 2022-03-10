import { getEcoledirecteTestAccount } from ".";
import { Homework, Session, EcoledirecteLoginOptions } from "../../../src/";

const { username, password } = getEcoledirecteTestAccount();

test("Homework", () => {
  (async () => {
    const account = await new Session(
      new EcoledirecteLoginOptions({
        username,
        password,
      })
    ).login();

    if (!account.hasFeature("HOMEWORK"))
      throw new Error("homework feature is not enabled");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const homework = await account.getHomework();
    expect(homework).toBeInstanceOf(Array);
    for (const h of homework) {
      expect(h).toBeInstanceOf(Homework);
    }
  })();
});
