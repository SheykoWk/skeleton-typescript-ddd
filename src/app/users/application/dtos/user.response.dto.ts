import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'common/dtos/core/dto.response';
import { User } from 'app/users/domain/entities/user.entity';

export class UserResponseDto extends ResponseDto<UserResponseDto> {
	@ApiProperty({
		description: 'User Id',
		example: 'fe54041b-0f6b-4c01-b56a-d350f0be4a2d',
	})
	id: string;

	@ApiProperty({
		description: 'User First Name',
		example: 'John',
	})
	firstName: string;

	@ApiProperty({
		description: 'User Last Name',
		example: 'Doe',
	})
	lastName: string;

	@ApiProperty({
		description: 'User Email',
		example: 'example@example.com',
	})
	email: string;

	@ApiProperty({
		description: 'User password hided',
		example: '*',
	})
	password: string;

	build(data: User): UserResponseDto {
		this.id = data.id.getValue();
		this.firstName = data.firstName.getValue();
		this.lastName = data.lastName.getValue();
		this.email = data.email.getValue();
		this.password = '*';
		return this;
	}
}
