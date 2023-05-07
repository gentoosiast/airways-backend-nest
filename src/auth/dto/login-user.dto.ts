import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: "User's email",
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's password",
    example: 'secretpassword#123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
