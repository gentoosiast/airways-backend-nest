import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { IATA_CODE_LENGTH } from 'src/shared/constants';

export class FlightsSearchDto {
  @ApiProperty({
    description: "Departure airport's IATA code",
    example: 'LED',
  })
  @IsNotEmpty()
  @IsString()
  @Length(IATA_CODE_LENGTH, IATA_CODE_LENGTH)
  departureIATA: string;

  @ApiProperty({
    description: "Arrival airport's IATA code",
    example: 'LAX',
  })
  @IsNotEmpty()
  @IsString()
  @Length(IATA_CODE_LENGTH, IATA_CODE_LENGTH)
  arrivalIATA: string;

  @ApiProperty({
    description: 'Flight date (in ISO 8601 format)',
    example: '2023-05-15',
  })
  @IsNotEmpty()
  @IsDateString()
  flightDate: string;

  @ApiProperty({
    description: 'Return flight date (in ISO 8601 format)',
    example: '2023-05-24',
    required: false,
  })
  @IsNotEmpty()
  @IsDateString()
  returnDate?: string;

  @ApiProperty({
    description: 'Number of adults',
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  adults: number;

  @ApiProperty({
    description: 'Number of children',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  children: number;

  @ApiProperty({
    description: 'Number of infants',
    example: 0,
  })
  @IsNotEmpty()
  @IsInt()
  infants: number;
}
