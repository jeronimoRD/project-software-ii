import { RequestStatus } from '@entity/entities';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsPhoneNumber,
  IsUUID,
  IsEnum,
} from 'class-validator';

// Enum to define user roles
export enum UserRole {
  ADMIN = 'admin', // Role for administrative users
  USER = 'user',   // Role for regular users
}

// Data Transfer Object for creating a new user
export class CreateUserDto {
  @IsNotEmpty() // Ensures firstName is not empty
  @IsString()   // Ensures firstName is a string
  @MinLength(6) // Ensures firstName has a minimum length of 6 characters
  firstName: string;

  @IsNotEmpty() // Ensures lastName is not empty
  @IsString()   // Ensures lastName is a string
  lastName: string;

  @IsNotEmpty() // Ensures username is not empty
  @IsString()   // Ensures username is a string
  @MinLength(4) // Ensures username has a minimum length of 4 characters
  username: string;

  @IsNotEmpty() // Ensures email is not empty
  @IsEmail()    // Ensures email is a valid email format
  email: string;

  @IsNotEmpty() // Ensures phone is not empty
  @IsPhoneNumber() // Ensures phone is a valid phone number format
  phone: string;

  @IsNotEmpty() // Ensures password is not empty
  @IsString()   // Ensures password is a string
  @MinLength(8) // Ensures password has a minimum length of 8 characters
  password: string;
}

// Data Transfer Object for updating user information
export class UpdateUserDto {
  @IsOptional() // Indicates that username is optional
  @IsString()   // Ensures username is a string
  username?: string;

  @IsOptional() // Indicates that phone is optional
  @IsString()   // Ensures phone is a string
  phone?: string;

  @IsOptional() // Indicates that email is optional
  @IsEmail()    // Ensures email is a valid email format
  email?: string;

  @IsOptional() // Indicates that password is optional
  @IsString()   // Ensures password is a string
  @MinLength(8) // Ensures password has a minimum length of 8 characters
  password?: string;
}

// Data Transfer Object for user login
export class LoginDto {
  @IsNotEmpty() // Ensures email is not empty
  @IsEmail()    // Ensures email is a valid email format
  email: string;

  @IsNotEmpty() // Ensures password is not empty
  @IsString()   // Ensures password is a string
  password: string;
}

// Data Transfer Object for refreshing tokens
export class RefreshTokenDto {
  @IsNotEmpty() // Ensures refreshToken is not empty
  @IsString()   // Ensures refreshToken is a string
  refreshToken: string;
}

// Data Transfer Object for changing user passwords
export class ChangePasswordDto {
  @IsNotEmpty() // Ensures currentPassword is not empty
  @IsString()   // Ensures currentPassword is a string
  currentPassword: string;

  @IsNotEmpty() // Ensures newPassword is not empty
  @IsString()   // Ensures newPassword is a string
  @MinLength(8) // Ensures newPassword has a minimum length of 8 characters
  newPassword: string;
}
