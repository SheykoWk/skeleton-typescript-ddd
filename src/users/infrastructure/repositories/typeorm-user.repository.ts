import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { UserRepository } from "../../domain/repositories/user.repository";
import { UserEntity } from "../persist/user.typeorm.entity";
import { User } from "../../domain/entities/user.entity";
import { TypeOrmUserMapper as UserMapper } from "../mappers/typeorm-user.mapper";
import { UserId } from "users/domain/value-objects/user-id.value-object";
import { Email } from "users/domain/value-objects/email.value-object";
import { QuerySearch } from "common/types/query-search.type";

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) { }

    async save(user: User): Promise<void> {
        const userEntity = UserMapper.toPersistence(user);
        await this.userRepo.save(userEntity);
    }

    async findById(id: UserId): Promise<User | null> {
        const userEntity = await this.userRepo.findOne({ where: { id: id.getValue() } });
        return userEntity ? UserMapper.toDomain(userEntity) : null;
    }

    async findByEmail(email: Email): Promise<User | null> {
        const userEntity = await this.userRepo.findOne({ where: { email: email.getValue() }, relations: ['roles'] });
        return userEntity ? UserMapper.toDomain(userEntity) : null;
    }

    async findAll(query: QuerySearch): Promise<User[]> {
        const users = await this.userRepo.find();
        return users.map(UserMapper.toDomain);
    }
}