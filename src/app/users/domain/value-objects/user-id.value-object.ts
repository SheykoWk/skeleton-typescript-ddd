import { isUUID } from 'class-validator';

export class UserId {
	private readonly id: string;

	constructor(userId: string) {
		if (!isUUID(userId)) {
			throw new Error('Invalid ID format');
		}
		this.id = userId;
	}

	getValue(): string {
		return this.id;
	}
}
