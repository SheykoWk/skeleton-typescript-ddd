import { Module } from '@nestjs/common';
import { BcryptHashService } from 'authentication/infrastructure/services/bcrypt-hash.service';
import { HashService } from 'common/classes/hash.service';

@Module({
	providers: [{ provide: HashService, useClass: BcryptHashService }],
	exports: [HashService],
})
export class HashModule {}
