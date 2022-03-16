import { getPronoteTestAccount } from "./getPronoteTestAccount";
import { PronoteLoginOptions, Session, StudentInfo } from "../../../src";

const { url, username, password, cas } = getPronoteTestAccount();

test("StudentInfo", () => {
  const session = new Session(
    new PronoteLoginOptions({
      username,
      password,
      url,
      cas,
    })
  );
  (async () => {
    const account = await session.login();
    if (!account.hasFeature("STUDENT_INFO")) {
      throw new Error("STUDENT_INFO feature is not enabled on this account");
    }

    const studentInfo = await account.getStudentInfo();
    expect(studentInfo).toBeInstanceOf(StudentInfo);
  })();
});
