import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginUserCommandHandler } from './application/handler/login-user-command.handler';
import { AuthService } from './domain/services/auth.service';
import { UsersModule } from 'app/users/users.module';
import { HashModule } from 'common/modules/hash.module';
import { AuthController } from './infrastructure/authentication.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { ApiExceptionsHttpStatusCodeMapping } from 'common/classes/api.exceptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
	imports: [
		CqrsModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('auth.jwt.secret'),
				signOptions: { expiresIn: '1h' },
			}),
		}),
		HashModule,
		UsersModule,
	],
	providers: [
		LoginUserCommandHandler,
		AuthService,
		JwtStrategy,
		ApiExceptionsHttpStatusCodeMapping,
	],
	controllers: [AuthController],
	exports: [AuthService, JwtModule, JwtStrategy],
})
export class AuthenticationModule {}
