import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entity/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    const secretKey = configService.get<string>('JWT_ACCESS_SECRET');
    // Check if the secret key is defined in the environment variables
    if (!secretKey) {
      throw new Error('JWT_ACCESS_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: any) {
    // Retrieve the user based on the ID from the JWT payload
    const user = await this.userRepository.findOneBy({ id: payload.sub });
    
    // If the user is not found, throw an UnauthorizedException
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return the user object if found
    return user;
  }
}
