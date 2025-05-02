import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Posts retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Posts not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 25;
    return await this.postService.findAll(pageNumber, limitNumber); 
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Post retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Post deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async remove(@Param('id') id: string) {
    return await this.postService.remove(+id);
  }
}
