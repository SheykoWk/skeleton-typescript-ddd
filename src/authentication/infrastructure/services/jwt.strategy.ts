import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'users/domain/repositories/user.repository';
import { User } from 'users/domain/entities/user.entity';
import { UserId } from 'users/domain/value-objects/user-id.value-object';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwt.secret'),
    });
  }

  async validate(payload: { sub: string }): Promise<User> {
	const userId = new UserId(payload.sub)
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found or invalid token');
    }

    return user;
  }
}