import { IsEmail, IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateUserRequestDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @Length(3, 100)
  firstName: string;

  @IsNotEmpty()
  @Length(3, 100)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(
    { id, firstName, lastName, email, password }: { id: string, firstName: string, lastName: string, email: string, password: string }
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
  }
}