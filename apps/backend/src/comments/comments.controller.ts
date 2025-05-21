import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/User';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiCreatedResponse({ type: Comment })
  @UseGuards(JwtAuthGuard)
  create(
    @User('sub') userId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(userId, createCommentDto);
  }

  @Get()
  @ApiOkResponse({ type: [Comment] })
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Comment })
  findOne(@Param('id') id: string): Promise<Comment | null> {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Comment })
  @UseGuards(JwtAuthGuard)
  update(
    @User('sub') userId: number,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment | null> {
    return this.commentsService.updateOne(userId, +id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Comment })
  remove(
    @User('sub') userId: number,
    @Param('id') id: string,
  ): Promise<Comment | null> {
    return this.commentsService.deleteOne(userId, +id);
  }
}
