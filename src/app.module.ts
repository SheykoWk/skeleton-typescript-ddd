import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from 'authentication/authentication.module';
import { AuthService } from 'authentication/domain/services/auth.service';
import { HashModule } from 'common/modules/hash.module';
import configuration from 'config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'common/decorator/roles.decorator';

@Module({
	imports: [
		CqrsModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => typeOrmConfig(configService),
		}),
		ConfigModule.forRoot({
			load: [configuration],
			isGlobal: true,
		}),
		UsersModule,
		AuthenticationModule,
		HashModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		AuthService,
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
