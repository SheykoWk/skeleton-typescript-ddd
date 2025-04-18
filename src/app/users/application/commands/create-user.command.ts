import { Command } from 'common/classes/api.command';

export class CreateUserCommand extends Command {
	constructor(
		commandId: string,
		private readonly _id: string,
		private readonly _firstName: string,
		private readonly _lastName: string,
		private readonly _email: string,
		private readonly _password: string,
	) {
		super(commandId);
	}

	public get id(): string {
		return this._id;
	}

	public get firstName(): string {
		return this._firstName;
	}

	public get lastName(): string {
		return this._lastName;
	}

	public get email(): string {
		return this._email;
	}

	public get password(): string {
		return this._password;
	}
}
