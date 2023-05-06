import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { SignupUserDto } from './dto/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await argon2.verify(user?.password, password))) {
      throw new UnauthorizedException();
    }

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user.toResponse();
  }

  async signup(userDto: SignupUserDto) {
    const existingUser = await this.usersService.findByEmail(userDto.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hash = await argon2.hash(userDto.password);

    const user = await this.usersService.create({
      ...userDto,
      password: hash,
    });

    return user.toResponse();
  }
}
