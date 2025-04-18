import { UserId } from '../value-objects/user-id.value-object';
import { FirstName } from '../value-objects/first-name.value-object';
import { LastName } from '../value-objects/last-name.value-object';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';
import { Permission } from '../enums/permissions.enum';
import { RoleMapperPermissions } from 'common/utils/permission.util';
import { Role } from '../enums/role.enum';

export class User {
	private readonly _id: UserId;
	private _firstName: FirstName;
	private _lastName: LastName;
	private _email: Email;
	private _password: Password;
	private _role: Role;

	constructor(
		id: UserId,
		firstName: FirstName,
		lastName: LastName,
		emailUser: Email,
		passwordUser: Password,
		role: Role
	) {
		this._id = id;
		this._firstName = firstName;
		this._lastName = lastName;
		this._email = emailUser;
		this._password = passwordUser;
		this._role = role
	}

	get id(): UserId {
		return this._id;
	}

	get firstName(): FirstName {
		return this._firstName;
	}

	get lastName(): LastName {
		return this._lastName;
	}

	get email(): Email {
		return this._email;
	}

	get password(): Password {
		return this._password;
	}

	get role(): Role {
		return this._role;
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

	verifyPassword(
		plainPassword: string,
		hashService: { compare: (raw: string, hash: string) => boolean },
	): boolean {
		return hashService.compare(plainPassword, this.password.getValue());
	}

	getPermissions(): Permission[] {
		return RoleMapperPermissions[this._role]
	}

	hasPermission(permission: Permission): boolean {
		return this.getPermissions().includes(permission);
	}
}
