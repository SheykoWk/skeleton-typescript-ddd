import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { LoginUserRequestDto } from 'common/dtos/request/login-user.request.dto';
import { ApiController } from 'common/classes/api.controller';
import { ApiExceptionsHttpStatusCodeMapping } from 'common/classes/api.exceptions';
import { LoginUserCommand } from 'authentication/application/commands/login-user.commant';
import { AuthenticationRoutes } from 'authentication/interfaces/enums/authentication.routes';

@Controller()
export class AuthController extends ApiController {
	constructor(
		queryBus: QueryBus,
		commandBus: CommandBus,
		exceptionMapping: ApiExceptionsHttpStatusCodeMapping,
	) {
		super(queryBus, commandBus, exceptionMapping);
	}

	@Post(AuthenticationRoutes.LOGIN)
	async login(@Body() loginRequestDto: LoginUserRequestDto) {

		const { email, password } = loginRequestDto;
		const newCommandId = uuid()
		const loginUserCommand = new LoginUserCommand(newCommandId, email, password)
		return this.commandBus.execute(loginUserCommand)
	}
}
