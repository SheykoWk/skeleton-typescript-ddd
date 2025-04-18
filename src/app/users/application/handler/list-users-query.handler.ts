import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListUsersQuery } from '../queries/list-users.query';
import { UserRepository } from 'app/users/domain/repositories/user.repository';
import { User } from 'app/users/domain/entities/user.entity';
import { UserService } from 'app/users/domain/services/user.service';

@QueryHandler(ListUsersQuery)
export class ListUsersQueryHandler implements IQueryHandler<ListUsersQuery> {
	constructor(private readonly userService: UserService) {}
	execute(query: ListUsersQuery): Promise<User[]> {
		return this.userService.getAllUsers();
	}
}
