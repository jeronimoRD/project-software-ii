import {
    ChangePasswordDto,
    CreateUserDto,
    LoginDto,
    UpdateUserDto,
} from '../dto/user.dto';

export interface User {
    id: string; // Unique identifier for the user
    firstName: string; // User's first name
    lastName: string; // User's last name
    username: string; // User's chosen username
    email: string; // User's email address
    phone: string; // User's phone number
    password: string; // User's password for authentication
    refreshToken?: string; // Optional refresh token for session management
}

export interface UserServiceInterface {
    create(createUserDto: CreateUserDto): Promise<User>; // Creates a new user and returns the created user
    findAll(): Promise<User[]>; // Retrieves all users and returns an array of users
    findOne(id: string): Promise<User>; // Finds a user by their unique ID and returns the user
    findByEmail(email: string): Promise<User>; // Finds a user by their email address and returns the user
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>; // Updates user information and returns the updated user
    remove(id: string): Promise<void>; // Removes a user by their unique ID
    login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }>; // Authenticates a user and returns access and refresh tokens
    refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>; // Refreshes the access token using the provided refresh token
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<void>; // Changes the user's password
}
