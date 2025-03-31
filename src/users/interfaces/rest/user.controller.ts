import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { UserRoutes } from '../enums/user.routes';
import { CreateUserRequestDto } from '../../application/dtos/create-user.dto';
import { ApiController } from 'common/classes/api.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiExceptionsHttpStatusCodeMapping } from 'common/classes/api.exceptions';
import { v4 as uuid } from 'uuid';
import { ListUsersQuery } from 'users/application/queries/list-users.query';

@Controller()
export class UserController extends ApiController {
	constructor(
		queryBus: QueryBus,
		commandBus: CommandBus,
		exceptionMapping: ApiExceptionsHttpStatusCodeMapping,
	) {
		super(queryBus, commandBus, exceptionMapping);
	}

	@Post(UserRoutes.POST_USERS)
	async create(@Body() createUserDto: CreateUserRequestDto) {
		const { id, firstName, lastName, email, password } = createUserDto;
		const newCommandId = uuid();
		const createUserCommand = new CreateUserCommand(
			newCommandId,
			id,
			firstName,
			lastName,
			email,
			password,
		);
		await this.commandBus.execute(createUserCommand);
	}

	@Get(UserRoutes.GET_USERS)
	async getUsers() {
		return this.queryBus.execute(new ListUsersQuery())
	}
}
