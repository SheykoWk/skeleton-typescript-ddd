import { Command } from "common/classes/api.command";

export class LoginUserCommand extends Command {
	constructor(
		commandId: string,
		private readonly _email: string,
		private readonly _password: string
	){
		super(commandId)
	}

	public get email(): string {
		return this._email
	}

	public get password(): string{
		return this._password
	}
}