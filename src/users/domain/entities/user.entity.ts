import * as bcrypt from 'bcrypt';
import { CreateUserRequestDto } from "../../application/dtos/create-user.dto";

export class User {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly password: string;

  constructor(
    userDto: CreateUserRequestDto
  ) {
    this.id = userDto.id;
    this.firstName = userDto.firstName;
    this.lastName = userDto.lastName;
    this.email = userDto.email;
    this.password = userDto.password;
  }

  static async create(userDto: CreateUserRequestDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    userDto.password = hashedPassword

    return new User(userDto);
  }
}