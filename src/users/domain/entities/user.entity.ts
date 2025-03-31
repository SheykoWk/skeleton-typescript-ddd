import { UserId } from '../value-objects/user-id.value-object';
import { FirstName } from '../value-objects/first-name.value-object';
import { LastName } from '../value-objects/last-name.value-object';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';

export class User {
  public readonly _id: UserId;
  public _firstName: FirstName;
  public _lastName: LastName;
  public _email: Email;
  public _password: Password;

  constructor(
    id: UserId, firstName: FirstName, lastName: LastName, emailUser: Email, passwordUser: Password
  ) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = emailUser;
    this._password = passwordUser;
  }

  get id(): string {
    return this._id.getValue();
  }

  get firstName(): string {
    return this._firstName.getValue();
  }

  get lastName(): string {
    return this._lastName.getValue();
  }

  get email(): string {
    return this._email.getValue();
  }

  get password(): string {
    return this._password.getHashedPassword();
  }

  public updateFirstName(firstName: FirstName): void {
    this._firstName = firstName;
  }

  public updateLastName(lastName: LastName): void {
    this._lastName = lastName;
  }

  public updateEmail(email: Email): void {
    this._email = email;
  }

  public async updatePassword(newPassword: Password): Promise<void> {
    this._password = newPassword;
  }
}