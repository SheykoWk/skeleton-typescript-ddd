import { HashService } from 'common/classes/hash.service';

export class Password {
	private readonly value: string;

	private constructor(hashedPassword: string) {
		this.value = hashedPassword;
	}

	static createHashed(plainTextPassword: string, hashService: HashService): Password {
		if (plainTextPassword.length < 8) {
			throw new Error('Min length is 8');
		}
		const hashed = hashService.hash(plainTextPassword);
		return new Password(hashed);
	}

	static fromHash(hashedPassword: string): Password {
		return new Password(hashedPassword);
	}

	compare(plainTextPassword: string, hashService: HashService): boolean {
		return hashService.compare(plainTextPassword, this.value);
	}

	getValue(): string {
		return this.value;
	}
}
