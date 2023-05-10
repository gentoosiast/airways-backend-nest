import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
import { AirportEntity } from './airport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AirportEntity])],
  controllers: [AirportsController],
  providers: [AirportsService],
  exports: [AirportsService],
})
export class AirportsModule {}
