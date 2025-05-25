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
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UsersService) {}

    //Register
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      return await this.userService.create(createUserDto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      return this.userService.login(loginDto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.userService.refreshToken(refreshTokenDto.refreshToken);
    }
  
    @Get()
    async findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.userService.findOne(id);
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.userService.remove(id);
    }
  
    @Post(':id/change-password')
    async changePassword(
      @Param('id') id: string,
      @Body() changePasswordDto: ChangePasswordDto,
    ) {
      return this.userService.changePassword(id, changePasswordDto);
    }
  }