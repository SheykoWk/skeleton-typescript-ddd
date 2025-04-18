import { QuerySearch } from 'common/types/query-search.type';
import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.value-object';
import { UserId } from '../value-objects/user-id.value-object';

export abstract class UserRepository {
	abstract save(user: User): Promise<void>;
	abstract findById(id: UserId): Promise<User | null>;
	abstract findAll(query?: QuerySearch): Promise<User[]>;
	abstract findByEmail(email: Email): Promise<User | null>;
}
