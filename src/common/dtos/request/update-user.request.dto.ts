import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserRequestDto {
	@Expose()
	@IsOptional()
	@Length(3, 100)
	firstName: string;

	@Expose()
	@IsOptional()
	@Length(3, 100)
	lastName: string;

	@Expose()
	@IsOptional()
	@IsEmail()
	email: string;

	@Expose()
	@IsOptional()
	password?: string;
}
