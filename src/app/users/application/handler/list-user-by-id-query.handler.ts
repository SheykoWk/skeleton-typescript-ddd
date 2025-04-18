import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListUserByIdQuery } from '../queries/list-user-by-id.query';
import { UserRepository } from 'app/users/domain/repositories/user.repository';
import { User } from 'app/users/domain/entities/user.entity';
import { UserId } from 'app/users/domain/value-objects/user-id.value-object';
import { UserService } from 'app/users/domain/services/user.service';

@QueryHandler(ListUserByIdQuery)
export class ListUserByIdQueryHandler implements IQueryHandler<ListUserByIdQuery> {
	constructor(private readonly userService: UserService) {}

	execute(query: ListUserByIdQuery): Promise<User> {
		const userId = new UserId(query.id);
		return this.userService.getUserById(userId);
	}
}
