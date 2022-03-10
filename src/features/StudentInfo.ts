import { Class, UserInfo, UserInfoOptions } from ".";

export class StudentInfo extends UserInfo {
  class?: Class;
  constructor(studentInfoOptions: StudentInfoOptions) {
    super(studentInfoOptions);
    this.class = studentInfoOptions.class;
  }

  toJSON() {
    return {
      id: this.id,

      fullName: this.fullName,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,

      establishmentfullName: this.establishmentfullName,

      class: this.class,
    };
  }
}

export interface StudentInfoOptions extends UserInfoOptions {
  class?: Class;
}
