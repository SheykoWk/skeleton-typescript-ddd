import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListUsersQuery } from "../queries/list-users.query";
import { UserRepository } from "users/domain/repositories/user.repository";

@QueryHandler(ListUsersQuery)
export class ListUsersQueryHandler implements IQueryHandler<ListUsersQuery>{
	constructor(private readonly userRepository: UserRepository){}
	execute(query: ListUsersQuery): Promise<any> {
		return this.userRepository.findAll()
	}
}