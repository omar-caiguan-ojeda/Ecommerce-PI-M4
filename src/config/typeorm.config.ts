import { config as dotenvConfig } from 'dotenv';
import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' }); // Carga las variables del archivo .env

const config = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Sincroniza automáticamente el esquema (deshabilítalo en producción)
  logging: true, // Registra las consultas en consola
  //entities: [join(__dirname, "../**/*.entity{.ts,.js}")], // Ruta de las entidades
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/**/*.migrations{.ts,.js}"],
  autoLoadEntities: true,
  //dropSchema: true, //(deshabilítalo en producción)
};

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);