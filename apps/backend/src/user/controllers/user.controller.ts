import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtUtil } from 'src/utils/jwt.util';
import { IVerifiedToken } from 'src/interface/IVerifiedToken';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtUtil: JwtUtil
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 25;
    return this.userService.findAll(pageNumber, limitNumber);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('me')
  async findMe(@Req() request: Request) {
    const authorization = request.headers['authorization'];
    if (!authorization) throw new Error('Authorization header not found');
    const token = authorization.split(' ')[1];
    if (!token) throw new Error('Token not found');

    const user: IVerifiedToken = this.jwtUtil.verify(token);
    return this.userService.findOne(+user.sub);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
