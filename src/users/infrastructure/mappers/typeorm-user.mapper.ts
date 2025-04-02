import { UserId } from 'users/domain/value-objects/user-id.value-object';
import { User } from '../../domain/entities/user.entity';
import { UserEntity } from '../persist/user.typeorm.entity';
import { FirstName } from 'users/domain/value-objects/first-name.value-object';
import { LastName } from 'users/domain/value-objects/last-name.value-object';
import { Email } from 'users/domain/value-objects/email.value-object';
import { Password } from 'users/domain/value-objects/password.value-object';

export class TypeOrmUserMapper {
	static toPersistence(user: User): UserEntity {
		const userEntity = new UserEntity();
		userEntity.id = user.id.getValue();
		userEntity.firstName = user.firstName.getValue();
		userEntity.lastName = user.lastName.getValue();
		userEntity.email = user.email.getValue();
		userEntity.password = user.password.getValue();
		userEntity.role = user.role;
		return userEntity;
	}

	static toDomain(userEntity: UserEntity): User {
		const userId = new UserId(userEntity.id);
		const firstName = new FirstName(userEntity.firstName);
		const lastName = new LastName(userEntity.lastName);
		const email = new Email(userEntity.email);
		const password = Password.fromHash(userEntity.password);

		return new User(userId, firstName, lastName, email, password, userEntity.role);
	}
}
