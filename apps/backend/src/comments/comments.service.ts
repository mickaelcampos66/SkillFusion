import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma.service';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly PrismaService: PrismaService) {}

  async findAll(): Promise<Comment[]> {
    return this.PrismaService.comment.findMany({});
  }

  async findOne(id: number): Promise<Comment | null> {
    return this.PrismaService.comment.findUnique({ where: { id } });
  }

  async deleteOne(userId: number, id: number): Promise<Comment | null> {
    const commentData = await this.findOne(id);
    if (commentData?.user_id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this comment',
      );
    }
    return this.PrismaService.comment.delete({ where: { id } });
  }

  async updateOne(
    userId: number,
    id: number,
    comment: UpdateCommentDto,
  ): Promise<Comment | null> {
    const commentData = await this.findOne(id);
    if (commentData?.user_id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this comment',
      );
    }
    return this.PrismaService.comment.update({ where: { id }, data: comment });
  }

  async create(userId: number, comment: CreateCommentDto): Promise<Comment> {
    const { post_id, content } = comment;
    return this.PrismaService.comment.create({
      data: { content, post_id, user_id: userId },
    });
  }
}
