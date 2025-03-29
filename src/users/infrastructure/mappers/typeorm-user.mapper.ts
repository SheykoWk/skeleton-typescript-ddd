import { User } from "../../domain/entities/user.entity";
import { UserEntity } from "../persist/user.typeorm.entity";

export class TypeOrmUserMapper {
  static toDomain(userEntity: UserEntity): User {
    return new User(userEntity);
  }

  static toEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    
    userEntity.id = user.id;
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.email = user.email;
    userEntity.password = user.password;

    return userEntity;
  }
}