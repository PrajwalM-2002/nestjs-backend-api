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

  async login(email: string, password: string) {
    // ✅ ADMIN LOGIN
    if (email === this.adminEmail && password === this.adminPassword) {
      const payload = {
        email: this.adminEmail,
        role: 'admin',
      };

      return {
        access_token: this.jwtService.sign(payload),
        role: 'admin',
      };
    }

    // ✅ USER LOGIN
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: 'user',
    };

    return {
      access_token: this.jwtService.sign(payload),
      role: 'user',
    };
  }

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      email,
      password: hashedPassword,
    });
  }
}
