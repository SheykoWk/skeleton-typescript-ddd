import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./interfaces/rest/user.controller";
import { TypeOrmUserRepository } from "./infrastructure/repositories/typeorm-user.repository";
import { UserEntity } from "./infrastructure/persist/user.typeorm.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { ApiExceptionsHttpStatusCodeMapping } from "common/classes/api.exceptions";
import { CreateUserHandler } from "./application/handler/create-user-command.handler";
import { UserService } from "./domain/services/user.service";
import { UserRepository } from "./domain/repositories/user.repository";
import { ListUsersQueryHandler } from "./application/handler/list-users-query.handler";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  providers: [
    CreateUserHandler,
	ListUsersQueryHandler,
	UserService,
	ApiExceptionsHttpStatusCodeMapping,
    { provide: UserRepository, useClass: TypeOrmUserRepository },
  ],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UsersModule {}