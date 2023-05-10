import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FlightsService } from './flights.service';
import { FlightsSearchDto } from './dto/flights-search.dto';

@ApiTags('flights')
@Controller('flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Post()
  @HttpCode(200)
  flights(@Body() flightsDto: FlightsSearchDto) {
    return this.flightsService.getFlights(flightsDto);
  }
}
