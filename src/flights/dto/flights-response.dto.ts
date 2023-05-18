import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsInt,
  IsNumber,
  ArrayMaxSize,
  ArrayUnique,
} from 'class-validator';
import { AirportResponseDto } from 'src/airports/dto/airport-response.dto';
import {
  PRICE_DECIMAL_PLACES,
  MAXIMUM_AIRPORT_CONNECTIONS,
} from '../constants';

export class PricesDto {
  @ApiProperty({
    description: 'Price in EUR',
    example: 175.6,
  })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: PRICE_DECIMAL_PLACES,
  })
  @IsPositive()
  EUR: number;

  @ApiProperty({
    description: 'Price in USD',
    example: 193.16,
  })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: PRICE_DECIMAL_PLACES,
  })
  @IsPositive()
  USD: number;

  @ApiProperty({
    description: 'Price in RUB',
    example: 15062.97,
  })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: PRICE_DECIMAL_PLACES,
  })
  @IsPositive()
  RUB: number;

  @ApiProperty({
    description: 'Price in PLN',
    example: 802.49,
  })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: PRICE_DECIMAL_PLACES,
  })
  @IsPositive()
  PLN: number;
}

class PriceComponentsDto {
  @ApiProperty({
    description: "Fare"
  })
  fare: PricesDto;

  @ApiProperty({
    description: "Tax & Service Charge"
  })
  tax: PricesDto;
}

export class FlightPriceDto {
  @ApiProperty({
    description: "Total price of the flight"
  })
  total: PricesDto;

  @ApiProperty({
    description: "Fare, tax & service charge for adult"
  })
  adults: PriceComponentsDto;

  @ApiProperty({
    description: "Fare, tax & service charge for child"
  })
  children: PriceComponentsDto;

  @ApiProperty({
    description: "Fare, tax & service charge for infant"
  })
  infants: PriceComponentsDto;
}

export class FlightsInfoDto {
  @ApiProperty({
    description: "Flight's number",
    example: 'FR 1925',
  })
  @IsNotEmpty()
  @IsString()
  flightNumber: string;

  @ApiProperty({
    description: 'Departure airport',
  })
  departureAirport: AirportResponseDto;

  @ApiProperty({
    description: 'Arrival airport',
  })
  arrivalAirport: AirportResponseDto;

  @ApiProperty({
    description: 'Departure date & time (in ISO 8601 format)',
    example: '2023-05-21T13:30:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  departureDate: string;

  @ApiProperty({
    description: 'Arrival date & time (in ISO 8601 format)',
    example: '2023-05-21T18:45:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  arrivalDate: string;

  @ApiProperty({
    description: 'Flight duration (in minutes)',
    example: 195,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  flightDuration: number;

  @ApiProperty({
    description: 'Price of the flight (in different currencies)',
  })
  price: FlightPriceDto;

  @ApiProperty({
    description: 'Total number of seats on the plane',
    example: 160,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  seats: number;

  @ApiProperty({
    description: 'Remaining number of seats on the plane',
    example: 28,
  })
  @IsNotEmpty()
  @IsInt()
  availableSeats: number;

  @ApiProperty({
    description: 'List of connected airports (IATA codes)',
    example: ['FRA', 'VIE'],
    isArray: true,
  })
  @ArrayMaxSize(MAXIMUM_AIRPORT_CONNECTIONS)
  @ArrayUnique()
  connections: string[];
}

export class FlightsResponseDto {
  @ApiProperty({
    description: 'List of flights',
    type: [FlightsInfoDto],
  })
  flights: FlightsInfoDto[];

  @ApiProperty({
    description: 'List of return flights',
    type: [FlightsInfoDto],
    required: false,
  })
  returnFlights?: FlightsInfoDto[];
}
