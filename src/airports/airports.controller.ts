import { Controller, Get, Query } from '@nestjs/common';
import { AirportsService } from './airports.service';

@Controller('airports')
export class AirportsController {
  constructor(private airportsService: AirportsService) {}

  @Get()
  airports(@Query('city') city: string) {
    return this.airportsService.findByCity(city);
  }
}
