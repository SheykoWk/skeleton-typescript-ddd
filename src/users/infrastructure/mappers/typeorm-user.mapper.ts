import { UserId } from "users/domain/value-objects/user-id.value-object";
import { User } from "../../domain/entities/user.entity";
import { UserEntity } from "../persist/user.typeorm.entity";
import { FirstName } from "users/domain/value-objects/first-name.value-object";
import { LastName } from "users/domain/value-objects/last-name.value-object";
import { Email } from "users/domain/value-objects/email.value-object";
import { Password } from "users/domain/value-objects/password.value-object";

export class TypeOrmUserMapper {
	static toPersistence(user: User): UserEntity {
	  const userEntity = new UserEntity();
	  userEntity.id = user.id; 
	  userEntity.firstName = user.firstName;
	  userEntity.lastName = user.lastName;
	  userEntity.email = user.email;
	  userEntity.password = user.password;
	  return userEntity;
	}
  
	static toDomain(userEntity: UserEntity): User {
	  const userId = new UserId(userEntity.id);
	  const firstName = new FirstName(userEntity.firstName);
	  const lastName = new LastName(userEntity.lastName);
	  const email = new Email(userEntity.email);
	  const password = new Password(userEntity.password);
  
	  return new User(userId, firstName, lastName, email, password);
	}
  }