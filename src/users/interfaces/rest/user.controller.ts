import { Controller, Post, Body, Get, Param, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { UserRoutes } from '../enums/user.routes';
import { CreateUserRequestDto } from '../../application/dtos/create-user.dto';
import { ApiController } from 'common/classes/api.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiExceptionsHttpStatusCodeMapping } from 'common/classes/api.exceptions';
import { v4 as uuid } from 'uuid';
import { ListUsersQuery } from 'users/application/queries/list-users.query';
import { User } from 'users/domain/entities/user.entity';
import { ListUserByIdQuery } from 'users/application/queries/list-user-by-id.query';
import { UpdateUserRequestDto } from 'users/application/dtos/update-user.request.dto';
import { UpdateUserCommand } from 'users/application/commands/update-user.command';

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
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createUserDto: CreateUserRequestDto): Promise<void> {
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
	@HttpCode(HttpStatus.OK)
	async getUsers(): Promise<User[]> {
		return this.queryBus.execute(new ListUsersQuery());
	}

	@Get(UserRoutes.GET_USER_BY_ID)
	@HttpCode(HttpStatus.OK)
	async getUserById(@Param('id') id: string): Promise<User> {
		return this.queryBus.execute(new ListUserByIdQuery(id));
	}

	@Put(UserRoutes.UPDATE_USER)
	@HttpCode(HttpStatus.NO_CONTENT)
	async putUser(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserRequestDto,
	): Promise<void> {
		const { firstName, lastName, email, password } = updateUserDto;
		const newCommanId = uuid();
		const updateUserCommand = new UpdateUserCommand(
			newCommanId,
			id,
			firstName,
			lastName,
			email,
			password,
		);
		await this.commandBus.execute(updateUserCommand)
	}
}
