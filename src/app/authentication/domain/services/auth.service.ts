import { Injectable, UnauthorizedException } from '@nestjs/common';
import { isNil } from 'lodash';
import { UserRepository } from 'app/users/domain/repositories/user.repository';
import { Email } from 'app/users/domain/value-objects/email.value-object';
import { Password } from 'app/users/domain/value-objects/password.value-object';
import { HashService } from '../../../../common/classes/hash.service';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	private readonly JWT_TOKEN_EXPIRATION = '1h';
	private readonly JWT_REFRESH_EXPIRATION = '7d';

	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly hashService: HashService,
	) {}

	generateAccessToken(payload: any): string {
		return this.jwtService.sign(payload, {
			expiresIn: this.JWT_TOKEN_EXPIRATION,
		});
	}

	generateRefreshToken(payload: any): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.get('auth.jwt.refresh_secret'),
			expiresIn: this.JWT_REFRESH_EXPIRATION,
		});
	}

	async loginUser(email: Email, password: string) {
		const user = await this.userRepository.findByEmail(email);
		if (isNil(user) || !user.verifyPassword(password, this.hashService)) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const payload = {
			sub: user.id.getValue(),
			role: user.role,
			permissions: user.getPermissions(),
		};
		const accessToken = this.generateAccessToken(payload);
		const refreshToken = this.generateRefreshToken(payload);

		return {
			accessToken,
			refreshToken,
			expiresIn: this.JWT_TOKEN_EXPIRATION,
			userId: user.id,
		};
	}

	refreshAccessToken(refreshToken: string) {
		try {
			const decoded = this.jwtService.verify(refreshToken, {
				secret: process.env.JWT_REFRESH_SECRET,
			});
			const payload = { sub: decoded.sub };

			const newAccessToken = this.generateAccessToken(payload);
			const newRefreshToken = this.generateRefreshToken(payload);

			return {
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
				expiresIn: this.JWT_TOKEN_EXPIRATION,
			};
		} catch (error) {
			throw new Error('Refresh token inválido o expirado');
		}
	}
}
