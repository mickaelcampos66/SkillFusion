import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../controllers/post.controller';
import { PostService } from '../services/post.service';
import { PrismaService } from 'src/prisma.service';
import { JwtUtil } from 'src/utils/jwt.util';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        PostService,
        { provide: PrismaService, useValue: {} },
        { provide: JwtUtil, useValue: {} },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
