import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FlightsService } from './flights.service';
import { FlightsSearchDto } from './dto/flights-search.dto';
import { FlightsResponseDto } from './dto/flights-response.dto';

@ApiTags('flights')
@Controller('flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: FlightsResponseDto,
  })
  @ApiBody({
    type: FlightsSearchDto
  })
  @Post()
  @HttpCode(200)
  flights(@Body() flightsDto: FlightsSearchDto) {
    return this.flightsService.getFlights(flightsDto);
  }
}
