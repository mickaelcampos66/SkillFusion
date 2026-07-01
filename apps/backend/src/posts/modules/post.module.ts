import { Module } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';
import { JwtCustomModule } from 'src/utils/jwt.module';

@Module({
  imports: [JwtCustomModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
