import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../commands/login-user.commant';
import { AuthService } from 'app/authentication/domain/services/auth.service';
import { Email } from 'app/users/domain/value-objects/email.value-object';

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
	constructor(private readonly authService: AuthService) {}

	async execute(command: LoginUserCommand) {
		const email = new Email(command.email);
		return this.authService.loginUser(email, command.password);
	}
}
