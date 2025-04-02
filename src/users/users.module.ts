import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserRepository } from './infrastructure/repositories/typeorm-user.repository';
import { UserEntity } from './infrastructure/persist/user.typeorm.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiExceptionsHttpStatusCodeMapping } from 'common/classes/api.exceptions';
import { CreateUserHandler } from './application/handler/create-user-command.handler';
import { UserService } from './domain/services/user.service';
import { UserRepository } from './domain/repositories/user.repository';
import { ListUsersQueryHandler } from './application/handler/list-users-query.handler';
import { ListUserByIdQueryHandler } from './application/handler/list-user-by-id-query.handler';
import { UpdateUserHAndler } from './application/handler/update-user-command.handler';
import { UserController } from './infrastructure/user.controller';
import { HashService } from 'common/classes/hash.service';
import { BcryptHashService } from 'authentication/infrastructure/services/bcrypt-hash.service';
import { AuthenticationModule } from 'authentication/authentication.module';
import { HashModule } from 'common/modules/hash.module';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule, HashModule],
	providers: [
		CreateUserHandler,
		UpdateUserHAndler,
		ListUsersQueryHandler,
		ListUserByIdQueryHandler,
		UserService,
		ApiExceptionsHttpStatusCodeMapping,
		{ provide: UserRepository, useClass: TypeOrmUserRepository },
	],
	controllers: [UserController],
	exports: [UserRepository],
})
export class UsersModule {}
