import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AirportsService } from './airports.service';
import { AirportResponseDto } from './dto/airport-response.dto';

@ApiTags('airports')
@Controller('airports')
export class AirportsController {
  constructor(private airportsService: AirportsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: AirportResponseDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'city',
    description: "Airport's city",
    example: 'St. Petersburg',
  })
  @Get()
  airports(@Query('city') city: string): Promise<AirportResponseDto[]> {
    return this.airportsService.findByCity(city);
  }
}
