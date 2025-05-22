import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiCreatedResponse({ type: Comment })
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
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
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment | null> {
    return this.commentsService.updateOne(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Comment })
  remove(@Param('id') id: string): Promise<Comment | null> {
    return this.commentsService.deleteOne(+id);
  }
}
