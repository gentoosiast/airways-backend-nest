import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<UserResponseDto> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await argon2.verify(user?.password, password))) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async signup(userDto: SignupUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersService.findByEmail(userDto.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hash = await argon2.hash(userDto.password);

    const user = await this.usersService.create({
      ...userDto,
      password: hash,
    });

    const payload = { username: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
