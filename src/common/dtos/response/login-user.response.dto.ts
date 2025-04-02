import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '../core/dto.response';

export class LoginUserResponseDto extends ResponseDto<LoginUserResponseDto> {
	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR...', description: 'Access Token' })
	accessToken: string;

	@ApiProperty({
		example: 'eyJhbGciOiJIUzI1NiIsInR...',
		description: 'Refresh Token',
		required: false,
	})
	refreshToken?: string;

	@ApiProperty({ example: 3600, description: 'Left time of token life' })
	expiresIn: number;

	build(data: any): LoginUserResponseDto {
		this.accessToken = data.accessToken
		this.refreshToken = data.refreshToken ?? null
		this.expiresIn = data.expiresIn
		return this
	}
}
