import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Airport } from './airports/airport.entity';
import { User } from './users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Airport, User],
  synchronize: process.env.NODE_ENV !== 'production',
};
