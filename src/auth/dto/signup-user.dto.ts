import { IsEmail, IsNotEmpty } from 'class-validator';
import { Gender } from 'src/users/types/gender';

export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  birthDate: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  citizenship: string;
}
