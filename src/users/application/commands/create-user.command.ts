import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { CreateUserRequestDto } from "../dtos/create-user.dto";

@Injectable()
export class CreateUserCommand {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userDto: CreateUserRequestDto): Promise<void> {
    const user = await User.create(userDto);
    await this.userRepository.save(user);
  }
}