import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../commands/update-user.command';
import { UserId } from 'users/domain/value-objects/user-id.value-object';
import { FirstName } from 'users/domain/value-objects/first-name.value-object';
import { LastName } from 'users/domain/value-objects/last-name.value-object';
import { Email } from 'users/domain/value-objects/email.value-object';
import { Password } from 'users/domain/value-objects/password.value-object';
import { UserService } from 'users/domain/services/user.service';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHAndler implements ICommandHandler<UpdateUserCommand> {
	constructor(private readonly userService: UserService){}

	async execute(command: UpdateUserCommand): Promise<void> {

		const id = new UserId(command.id);
		const firstName = new FirstName(command.firstName);
		const lastName = new LastName(command.lastName);
		const userEmail = new Email(command.email);
		const userPassword = new Password(command.password);

		await this.userService.updateUser(id, firstName, lastName, userEmail, userPassword);
	}
}
