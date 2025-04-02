import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'local';
const configPath = path.resolve(path.join(__dirname, `../../config/${env}.config.yml`));
let config: any;

try {
  config = yaml.load(fs.readFileSync(configPath, 'utf8')) as Record<string, any>;
} catch (e) {
  throw new Error(`Error trying to read YAML config: ${e.message}`);
}

if (!config) {
  throw new Error(`Config not found: ${env}`);
}

const AppDataSource = new DataSource({
	type: 'postgres',
	host: config.db.host ?? 'localhost',
	port: config.db.port ?? 5432,
	username: config.db.username ?? 'postgres',
	password: config.db.password ?? '',
	database: config.db.database ?? '',
	entities: [path.resolve(__dirname, '../**/*.typeorm.entity{.ts,.js}')],
	migrations: [path.resolve(path.join(__dirname, '../../dist/persist/migrations/*.js'))],
	migrationsTableName: 'migrations',
	synchronize: false,
	logging: config.db.logging ?? true,
});

module.exports = { AppDataSource };
