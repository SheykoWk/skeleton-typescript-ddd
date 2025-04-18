import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../commands/update-user.command';
import { UserId } from 'app/users/domain/value-objects/user-id.value-object';
import { FirstName } from 'app/users/domain/value-objects/first-name.value-object';
import { LastName } from 'app/users/domain/value-objects/last-name.value-object';
import { Email } from 'app/users/domain/value-objects/email.value-object';
import { Password } from 'app/users/domain/value-objects/password.value-object';
import { UserService } from 'app/users/domain/services/user.service';
import { HashService } from 'common/classes/hash.service';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHAndler implements ICommandHandler<UpdateUserCommand> {
	constructor(
		private readonly userService: UserService,
		private readonly hashService: HashService,
	) {}

	async execute(command: UpdateUserCommand): Promise<void> {
		const id = new UserId(command.id);
		const firstName = new FirstName(command.firstName);
		const lastName = new LastName(command.lastName);
		const userEmail = new Email(command.email);
		const userPassword = Password.createHashed(command.password, this.hashService);

		await this.userService.updateUser(id, firstName, lastName, userEmail, userPassword);
	}
}
