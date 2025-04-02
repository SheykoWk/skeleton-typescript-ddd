import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';
import { LastName } from '../value-objects/last-name.value-object';
import { FirstName } from '../value-objects/first-name.value-object';
import { UserId } from '../value-objects/user-id.value-object';
import { isNil } from 'lodash';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(id: UserId, firstName: FirstName, lastName: LastName, emailUser: Email, passwordUser: Password): Promise<void> {
    const user = new User(id, firstName, lastName, emailUser,  passwordUser );

    await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]>{
	return await this.userRepository.findAll()
  }

  async getUserById(id: UserId): Promise<User>{
	return await this.userRepository.findById(id)
  }

  async updateUser(id: UserId, firstName: FirstName, lastName: LastName, emailUser: Email, passwordUser: Password): Promise<void>{
	const existingUser = await this.getUserById(id)

	if(isNil(existingUser)){
		throw new NotFoundException()
	}

	existingUser.updateFirstName(firstName)
	existingUser.updateLastName(lastName)
	existingUser.updateEmail(emailUser)
	if(!isNil(passwordUser.getValue())){
		existingUser.updatePassword(passwordUser)
	}

    await this.userRepository.save(existingUser);
  }
}