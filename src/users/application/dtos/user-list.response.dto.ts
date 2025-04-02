import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'common/dtos/core/dto.response';
import { UserResponseDto } from './user.response.dto';
import { User } from 'users/domain/entities/user.entity';

export class UserListResponseDto extends ResponseDto<UserListResponseDto> {
	@ApiProperty({
		description: 'Users list',
		example: [],
		isArray: true,
		type: UserResponseDto,
	})
	data: UserResponseDto[];

	build(users: User[]): UserListResponseDto {
		this.data = users.map((user) => 
			 new UserResponseDto().build(user)
		);
		return this
	}
}
