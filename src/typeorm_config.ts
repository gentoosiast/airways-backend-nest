import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AirportEntity } from './airports/airport.entity';
import { UserEntity } from './users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [AirportEntity, UserEntity],
  synchronize: process.env.NODE_ENV !== 'production',
};
