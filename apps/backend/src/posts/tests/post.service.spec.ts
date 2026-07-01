import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../services/post.service';
import { PrismaService } from 'src/prisma.service';
import { JwtUtil } from 'src/utils/jwt.util';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: PrismaService, useValue: {} },
        { provide: JwtUtil, useValue: {} },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
