import { Session, StudentInfo, EcoledirecteLoginOptions } from "../../../src";
import { getEcoledirecteTestAccount } from "./getEcoledirecteTestAccount";

const { username, password } = getEcoledirecteTestAccount();

test("StudentInfo", () => {
  (async () => {
    const session = new Session(
      new EcoledirecteLoginOptions({
        username,
        password,
      })
    );
    const account = await session.login();
    const studentInfo = await account.getStudentInfo();
    expect(studentInfo).toBeInstanceOf(StudentInfo);
  })();
});
