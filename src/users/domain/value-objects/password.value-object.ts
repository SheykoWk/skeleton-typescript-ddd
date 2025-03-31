import * as bcrypt from 'bcryptjs';

export class Password {
	private hashedPassword: string;

	constructor(private plainPassword: string) {}

	getHashedPassword(): string {
		const salt = bcrypt.genSaltSync(10);
		this.hashedPassword = bcrypt.hashSync(this.plainPassword, salt);
		return this.hashedPassword;
	}

	async validatePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.hashedPassword);
	}

	getValue(): string {
		return this.hashedPassword;
	}
}
