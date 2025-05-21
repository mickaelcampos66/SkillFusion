import { Module } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
