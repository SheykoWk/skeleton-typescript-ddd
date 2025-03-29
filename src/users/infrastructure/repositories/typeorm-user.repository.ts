import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { UserRepository } from "../../domain/repositories/user.repository";
import { UserEntity } from "../persist/user.typeorm.entity";
import { User } from "../../domain/entities/user.entity";
import { TypeOrmUserMapper as UserMapper } from "../mappers/typeorm-user.mapper";

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) { }

    async save(user: User): Promise<void> {
        const userEntity = UserMapper.toEntity(user);
        await this.userRepo.save(userEntity);
    }

    async findById(id: string): Promise<User | null> {
        const userEntity = await this.userRepo.findOne({ where: { id } });
        return userEntity ? UserMapper.toDomain(userEntity) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const userEntity = await this.userRepo.findOne({ where: { email } });
        return userEntity ? UserMapper.toDomain(userEntity) : null;
    }

    async findAll(): Promise<User[]> {
        const users = await this.userRepo.find();
        return users.map(UserMapper.toDomain);
    }
}