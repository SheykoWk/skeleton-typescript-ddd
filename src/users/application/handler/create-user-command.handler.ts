import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { Email } from '../../domain/value-objects/email.value-object';
import { Password } from '../../domain/value-objects/password.value-object';
import { UserService } from 'users/domain/services/user.service';
import { UserId } from 'users/domain/value-objects/user-id.value-object';
import { FirstName } from 'users/domain/value-objects/first-name.value-object';
import { LastName } from 'users/domain/value-objects/last-name.value-object';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: CreateUserCommand) {

    // Create Value Objects
	const id = new UserId(command.id)
	const firstName = new FirstName(command.firstName)
	const lastName = new LastName(command.lastName)
    const userEmail = new Email(command.email);
    const userPassword = new Password(command.password);

    return this.userService.createUser(id, firstName, lastName, userEmail, userPassword);
  }
}