import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 🔐 ADMIN CREDENTIALS (HARDCODED)
  private readonly adminEmail = 'prajwaladmin@email.com';
  private readonly adminPassword = 'PrajwalM-2002';

  // LOGIN
  async login(email: string, password: string) {
    // ADMIN LOGIN
    if (email === this.adminEmail && password === this.adminPassword) {
      return {
        access_token: this.jwtService.sign({
          email,
          role: 'admin',
        }),
        role: 'admin',
      };
    }

    // USER LOGIN
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: 'user',
      }),
      role: 'user',
    };
  }

  // REGISTER
  async register(email: string, password: string) {
    await this.usersService.create(email, password);
    return { message: 'User registered successfully' };
  }
}
