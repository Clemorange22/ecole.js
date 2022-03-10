export class UserInfo {
  id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;

  establishmentfullName?: string;
  constructor(userInfoOptions: UserInfoOptions) {
    this.id = userInfoOptions.id;
    this.fullName = userInfoOptions.fullName;
    this.firstName = userInfoOptions.firstName;
    this.lastName = userInfoOptions.lastName;
    this.email = userInfoOptions.email;
    this.phone = userInfoOptions.phone;
    this.establishmentfullName = userInfoOptions.establishmentfullName;
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
    };
  }
}

export interface UserInfoOptions {
  id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;

  establishmentfullName?: string;
}
