import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateUserRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Expose()
  @IsNotEmpty()
  @Length(3, 100)
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @Length(3, 100)
  lastName: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  password: string;
}