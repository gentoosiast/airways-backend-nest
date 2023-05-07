import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MINIMUM_PASSWORD_LENGTH } from '../constants';
import { Gender } from 'src/shared/enums/gender';

export class SignupUserDto {
  @ApiProperty({
    description: "User's email",
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's password",
    example: 'secretpassword#123',
    minLength: MINIMUM_PASSWORD_LENGTH,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(MINIMUM_PASSWORD_LENGTH)
  password: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Birth date of the user (in ISO 8601 format)',
    example: '1997-09-24',
  })
  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    enum: Object.values(Gender),
    description: 'Gender of the user',
    example: Gender.MALE,
    default: Gender.MALE,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Citizenship of the user',
    example: 'USA',
  })
  @IsNotEmpty()
  @IsString()
  citizenship: string;
}
