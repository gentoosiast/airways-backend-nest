import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
import { Airport } from './airport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Airport])],
  controllers: [AirportsController],
  providers: [AirportsService],
})
export class AirportsModule {}
