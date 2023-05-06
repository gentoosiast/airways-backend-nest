import { Controller, Get, Query } from '@nestjs/common';
import { AirportsService } from './airports.service';

@Controller('airports')
export class AirportsController {
  constructor(private airportsService: AirportsService) {}

  @Get()
  airports(@Query('name') name: string) {
    return this.airportsService.findByName(name);
  }
}
