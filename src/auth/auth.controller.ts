import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('user')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    return this.authService.login(loginUserDto.email, loginUserDto.password);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponseDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  signup(@Body() signupUserDto: SignupUserDto): Promise<UserResponseDto> {
    return this.authService.signup(signupUserDto);
  }
}
