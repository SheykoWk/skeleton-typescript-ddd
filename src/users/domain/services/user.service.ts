import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';
import { LastName } from '../value-objects/last-name.value-object';
import { FirstName } from '../value-objects/first-name.value-object';
import { UserId } from '../value-objects/user-id.value-object';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(id: UserId, firstName: FirstName, lastName: LastName, emailUser: Email, passwordUser: Password): Promise<void> {
    const user = new User(id, firstName, lastName, emailUser,  passwordUser);

    await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]>{
	return await this.userRepository.findAll()
  }

  async getUserById(id: UserId): Promise<User>{
	return await this.userRepository.findById(id)
  }
}