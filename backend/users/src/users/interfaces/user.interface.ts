import {
    ChangePasswordDto,
    CreateUserDto,
    LoginDto,
    UpdateUserDto,
  } from '../dto/user.dto';
  
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    refreshToken?: string;
  }
  
  export interface UserServiceInterface {
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    login(
      loginDto: LoginDto,
    ): Promise<{ accessToken: string; refreshToken: string }>;
    refreshToken(
      refreshToken: string,
    ): Promise<{ accessToken: string; refreshToken: string }>;
    changePassword(
      id: string,
      changePasswordDto: ChangePasswordDto,
    ): Promise<void>;
  }