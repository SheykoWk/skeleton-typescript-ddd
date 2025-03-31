export class Command {
	constructor(private readonly _commandId: string) {}

	get commandId() {
		return this._commandId;
	}
}
