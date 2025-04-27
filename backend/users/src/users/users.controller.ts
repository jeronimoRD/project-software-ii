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
    constructor(private readonly usersService: UsersService) {}

    //Register
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      return await this.usersService.create(createUserDto);
    }
  
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      return this.usersService.login(loginDto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.usersService.refreshToken(refreshTokenDto.refreshToken);
    }
  
    @Get()
    async findAll() {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.usersService.findOne(id);
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.usersService.remove(id);
    }
  
    @Post(':id/change-password')
    async changePassword(
      @Param('id') id: string,
      @Body() changePasswordDto: ChangePasswordDto,
    ) {
      return this.usersService.changePassword(id, changePasswordDto);
    }
  }