import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { SignupUserDto } from './signup-user.dto';

class User extends OmitType(SignupUserDto, ['password'] as const) {
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;
}

export class UserResponseDto {
  @ApiProperty({
    description: "User's access JWT token",
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdlcnRvb3NpYXN0aWNAZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE2ODM0ODIzNTUsImV4cCI6MTY4MzU2ODc1NX0.uP_Pa2iZK_fvkK7Y7nWX9M_VC7-dFTRhKmrplHhSKEI',
  })
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @ApiProperty({
    description: 'User',
  })
  user: User;
}
