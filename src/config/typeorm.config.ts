import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>("db.postgres"),
  port: configService.get<number>("db.port"),
  username: configService.get<string>("db.username"),
  password: configService.get<string>("db.password"),
  database: configService.get<string>("db.database"),
  autoLoadEntities: true,
  synchronize: configService.get<boolean>("db.synchronize"),
});