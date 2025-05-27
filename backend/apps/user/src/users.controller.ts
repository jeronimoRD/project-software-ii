import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
    CreateUserDto,
    UpdateUserDto,
    LoginDto,
    RefreshTokenDto,
    ChangePasswordDto,
} from './dto/user.dto';
import { DevOnly } from '@auth/auth';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    // Register a new user
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @HttpCode(HttpStatus.OK)
    // Log in an existing user
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.userService.login(loginDto);
    }

    @HttpCode(HttpStatus.OK)
    // Refresh the user's authentication token
    @Post('refresh-token')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.userService.refreshToken(refreshTokenDto.refreshToken);
    }

    @Get()
    @DevOnly()
    // Retrieve all users (Developer only)
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    // Retrieve a user by their ID
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    // Update a user's information
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    // Remove a user by their ID
    async remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

    @Post(':id/change-password')
    // Change a user's password
    async changePassword(
        @Param('id') id: string,
        @Body() changePasswordDto: ChangePasswordDto,
    ) {
        return this.userService.changePassword(id, changePasswordDto);
    }
}
