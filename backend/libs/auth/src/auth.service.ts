// apps/auth/src/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'apps/user/src/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    // aquí bcrypt.compare en UsersService ya fue hecho en login de UsersService
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string } | null> {
    const user = await this.validateUser(email, password);
    if (!user) {
      return null;  
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken  = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,         // o tu ConfigService
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,  // opcional
    });

    return { accessToken, refreshToken };
  }
}
