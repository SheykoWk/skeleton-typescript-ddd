require('dotenv').config();
const { DataSource } = require('typeorm');
const path =require('path');

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "",
  entities: [
    path.resolve(__dirname, '../**/*.typeorm.entity.js'),
  ],
  migrations: [
    path.resolve(__dirname, '../../dist/persist/migrations/*.js'), 
  ],
  migrationsDir: path.resolve(__dirname, '../../dist/persist/migrations/'),
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
});

module.exports = { AppDataSource }