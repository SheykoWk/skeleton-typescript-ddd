import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListUserByIdQuery } from "../queries/list-user-by-id.query";
import { UserRepository } from "users/domain/repositories/user.repository";
import { User } from "users/domain/entities/user.entity";
import { UserId } from "users/domain/value-objects/user-id.value-object";

@QueryHandler(ListUserByIdQuery)
export class ListUserByIdQueryHandler implements IQueryHandler<ListUserByIdQuery> {
	constructor(
		private readonly userRepository: UserRepository
	){

	}

	execute(query: ListUserByIdQuery): Promise<User> {
		const userId = new UserId(query.id)
		return this.userRepository.findById(userId)
	}
}