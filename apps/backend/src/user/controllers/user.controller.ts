import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtUtil } from 'src/utils/jwt.util';
import { IVerifiedToken } from 'src/interface/IVerifiedToken';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtUtil: JwtUtil
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Page number for pagination',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Limit of users per page',
    example: '25',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users',
  })
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 25;
    return this.userService.findAll(pageNumber, limitNumber);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the current user' })
  @ApiResponse({
    status: 200,
    description: 'Current user details',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findMe(@Req() request: Request) {
    const authorization = request.headers['authorization'];
    if (!authorization) throw new Error('Authorization header not found');
    const token = authorization.split(' ')[1];
    if (!token) throw new Error('Token not found');

    const user: IVerifiedToken = this.jwtUtil.verify(token);
    return this.userService.findOne(+user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID to fetch the user details',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User details retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user details by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID to update the user details',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID to delete the user',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
