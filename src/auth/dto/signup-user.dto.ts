import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { MINIMUM_PASSWORD_LENGTH } from '../constants';
import { Gender } from 'src/shared/enums/gender';

export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(MINIMUM_PASSWORD_LENGTH)
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  citizenship: string;
}
