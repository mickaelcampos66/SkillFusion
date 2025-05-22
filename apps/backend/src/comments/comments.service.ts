import { Injectable } from '@nestjs/common';
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

  async deleteOne(id: number): Promise<Comment | null> {
    return this.PrismaService.comment.delete({ where: { id } });
  }

  async updateOne(
    id: number,
    comment: UpdateCommentDto,
  ): Promise<Comment | null> {
    return this.PrismaService.comment.update({ where: { id }, data: comment });
  }

  async create(comment: CreateCommentDto): Promise<Comment> {
    return this.PrismaService.comment.create({ data: comment });
  }
}
