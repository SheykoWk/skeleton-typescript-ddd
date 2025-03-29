import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./interfaces/rest/user.controller";
import { TypeOrmUserRepository } from "./infrastructure/repositories/typeorm-user.repository";
import { CreateUserCommand } from "./application/commands/create-user.command";
import { UserEntity } from "./infrastructure/persist/user.typeorm.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    { provide: "UserRepository", useClass: TypeOrmUserRepository },
  ],
  controllers: [UserController],
  exports: ["UserRepository"],
})
export class UsersModule {}