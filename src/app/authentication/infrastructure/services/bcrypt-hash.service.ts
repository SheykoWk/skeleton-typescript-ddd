import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { HashService } from '../../../../common/classes/hash.service';

@Injectable()
export class BcryptHashService implements HashService {
	compare(raw: string, hash: string): boolean {
		return bcrypt.compareSync(raw, hash);
	}

	hash(password: string): string {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	}
}
