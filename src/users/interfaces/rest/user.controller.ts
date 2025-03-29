import { Controller, Post, Body, Get } from "@nestjs/common";
import { CreateUserCommand } from "../../application/commands/create-user.command";
import { UserRoutes } from "../enums/user.routes";
import { CreateUserRequestDto } from "../../application/dtos/create-user.dto";

@Controller()
export class UserController {
  constructor(private readonly createUserCommand: CreateUserCommand) { }

  @Post(UserRoutes.POST_USERS)
  async create(@Body() createUserDto: CreateUserRequestDto) {
    await this.createUserCommand.execute(createUserDto);
  }

  @Get(UserRoutes.GET_USERS)
  async getUsers() {
    return Promise.resolve([])
  }
}