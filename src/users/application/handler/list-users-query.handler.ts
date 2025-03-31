import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListUsersQuery } from "../queries/list-users.query";
import { UserRepository } from "users/domain/repositories/user.repository";
import { User } from "users/domain/entities/user.entity";

@QueryHandler(ListUsersQuery)
export class ListUsersQueryHandler implements IQueryHandler<ListUsersQuery>{
	constructor(private readonly userRepository: UserRepository){}
	execute(query: ListUsersQuery): Promise<User[]> {
		return this.userRepository.findAll()
	}
}