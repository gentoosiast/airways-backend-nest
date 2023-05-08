import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsPositive,
  Length,
} from 'class-validator';
import { IATA_CODE_LENGTH } from 'src/shared/constants';

export class AirportResponseDto {
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    description: "Airport's IATA code",
    example: 'LED',
  })
  @IsNotEmpty()
  @IsString()
  @Length(IATA_CODE_LENGTH, IATA_CODE_LENGTH)
  iata_code: string;

  @ApiProperty({
    description: "Airport's name",
    example: 'Pulkovo',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Airport's city",
    example: 'St. Petersburg',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: "Airport's country",
    example: 'Russia',
  })
  @IsNotEmpty()
  @IsString()
  country: string;
}
