import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserRequestDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;
}