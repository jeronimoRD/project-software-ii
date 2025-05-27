import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '@entity/entities/user.entity';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
} from './dto/user.dto';
import { UserServiceInterface } from './interfaces/user.interface';
import { EmailService } from '@email/email/email.service';

@Injectable()
export class UsersService implements UserServiceInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  private sanitizeUser(user: User): User {
    const sanitized = { ...user };
    delete (sanitized as any).password; // Remove password from the sanitized user object
    delete (sanitized as any).refreshToken; // Remove refreshToken from the sanitized user object
    return sanitized;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered'); // Throw an exception if the email is already in use
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Hash the user's password
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser); // Save the new user to the database
    await this.emailService.sendWelcomeEmail(
      savedUser.email,
      savedUser.username,
    ); // Send a welcome email to the new user
    return this.sanitizeUser(savedUser); // Return the sanitized user object
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) throw new NotFoundException('User not found'); // Throw an exception if the user is not found

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials'); // Throw an exception if the password is invalid

    const tokens = await this.getTokens(user.id, user.email, user.role); // Generate access and refresh tokens
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10); // Hash the refresh token

    await this.userRepository.update(user.id, {
      refreshToken: hashedRefreshToken, // Update the user's refresh token in the database
    });

    return tokens; // Return the generated tokens
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'), // Verify the refresh token
      });

      const user = await this.userRepository.findOneBy({ id: payload.sub });
      if (!user?.refreshToken) throw new UnauthorizedException('Invalid token'); // Check if the user has a refresh token

      const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isValid) throw new UnauthorizedException('Invalid token'); // Validate the refresh token

      const tokens = await this.getTokens(user.id, user.email, user.role); // Generate new tokens
      const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10); // Hash the new refresh token

      await this.userRepository.update(user.id, {
        refreshToken: hashedRefreshToken, // Update the user's refresh token in the database
      });

      return tokens; // Return the new tokens
    } catch (error) {
      throw new UnauthorizedException('Invalid token'); // Handle any errors by throwing an unauthorized exception
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find(); // Retrieve all users from the database
    return users.map((user) => this.sanitizeUser(user)); // Return sanitized user objects
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ID "${id}" not found`); // Throw an exception if the user is not found
    return this.sanitizeUser(user); // Return the sanitized user object
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new NotFoundException(`User with email "${email}" not found`); // Throw an exception if the user is not found
    return this.sanitizeUser(user); // Return the sanitized user object
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ID "${id}" not found`); // Throw an exception if the user is not found

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) throw new ConflictException('Email already registered'); // Throw an exception if the email is already in use
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10); // Hash the new password
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return this.sanitizeUser(updatedUser); // Return the sanitized updated user object
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`); // Throw an exception if the user was not found
    }
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ID "${id}" not found`); // Throw an exception if the user is not found

    const isValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!isValid)
      throw new UnauthorizedException('Current password is incorrect'); // Throw an exception if the current password is incorrect

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10); // Hash the new password
    await this.userRepository.update(id, { password: hashedPassword }); // Update the user's password in the database
  }

  private async getTokens(userId: string, email: string, role: string): Promise<{ accessToken: string; refreshToken: string }> {
    
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role},
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role},
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
        },
      ),
    ]);

    return { accessToken, refreshToken }; // Return the generated access and refresh tokens
  }
}
