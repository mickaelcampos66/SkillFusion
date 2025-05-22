import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PrismaService } from '../prisma.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

describe('CommentsService', () => {
  let service: CommentsService;
  let prismaService: PrismaService;

  const mockComment: Comment = {
    id: 1,
    content: 'Test comment',
    post_id: 1,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockComments: Comment[] = [mockComment];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: PrismaService,
          useValue: {
            comment: {
              findMany: jest.fn().mockResolvedValue(mockComments),
              findUnique: jest.fn().mockResolvedValue(mockComment),
              create: jest.fn().mockResolvedValue(mockComment),
              update: jest.fn().mockResolvedValue(
                Object.assign(new Comment(), mockComment, {
                  content: 'Updated',
                }),
              ),
              delete: jest.fn().mockResolvedValue(mockComment),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of comments', async () => {
      const findManySpy = jest.spyOn(
        prismaService.comment,
        'findMany',
      ) as jest.SpiedFunction<typeof prismaService.comment.findMany>;
      const result = await service.findAll();

      expect(result).toEqual(mockComments);
      expect(findManySpy).toHaveBeenCalledWith({});
    });
  });

  describe('findOne', () => {
    it('should return a single comment', async () => {
      const findUniqueSpy = jest.spyOn(
        prismaService.comment,
        'findUnique',
      ) as jest.SpiedFunction<typeof prismaService.comment.findUnique>;
      const result = await service.findOne(1);

      expect(result).toEqual(mockComment);
      expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return null for non-existent comment', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const findUniqueSpy = jest
        .spyOn(prismaService.comment, 'findUnique')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .mockResolvedValueOnce(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('create', () => {
    it('should create and return a comment', async () => {
      const dto: CreateCommentDto = {
        content: 'Test comment',
        user_id: 1,
        post_id: 1,
      };

      const createSpy = jest.spyOn(
        prismaService.comment,
        'create',
      ) as jest.SpiedFunction<typeof prismaService.comment.create>;
      const result = await service.create(dto);

      expect(result).toEqual(mockComment);
      expect(createSpy).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('updateOne', () => {
    it('should update and return a comment', async () => {
      const dto: UpdateCommentDto = { content: 'Updated' };
      const updateSpy = jest.spyOn(
        prismaService.comment,
        'update',
      ) as jest.SpiedFunction<typeof prismaService.comment.update>;
      const result = await service.updateOne(1, dto);

      expect(result).toEqual(
        Object.assign(new Comment(), mockComment, {
          content: 'Updated',
        }),
      );
      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe('deleteOne', () => {
    it('should delete and return a comment', async () => {
      const deleteSpy = jest.spyOn(
        prismaService.comment,
        'delete',
      ) as jest.SpiedFunction<typeof prismaService.comment.delete>;
      const result = await service.deleteOne(1);

      expect(result).toEqual(mockComment);
      expect(deleteSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return null when deleting non-existent comment', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const deleteSpy = jest
        .spyOn(prismaService.comment, 'delete')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .mockRejectedValueOnce(new Error('Comment not found'));

      await expect(service.deleteOne(999)).rejects.toThrow('Comment not found');
      expect(deleteSpy).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });
});
