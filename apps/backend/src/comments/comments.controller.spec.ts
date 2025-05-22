import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

describe('CommentsController', () => {
  let controller: CommentsController;
  let commentsService: CommentsService;

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
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockComment),
            findAll: jest.fn().mockResolvedValue(mockComments),
            findOne: jest.fn().mockResolvedValue(mockComment),
            updateOne: jest.fn().mockResolvedValue(
              Object.assign(new Comment(), mockComment, {
                content: 'Updated',
              }),
            ),
            deleteOne: jest.fn().mockResolvedValue(mockComment),
          },
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);

    // Set up spies
    jest.spyOn(commentsService, 'create');
    jest.spyOn(commentsService, 'findAll');
    jest.spyOn(commentsService, 'findOne');
    jest.spyOn(commentsService, 'updateOne');
    jest.spyOn(commentsService, 'deleteOne');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a comment with valid data', async () => {
      const dto: CreateCommentDto = {
        content: 'Test comment',
        user_id: 1,
        post_id: 1,
      };

      const createSpy = jest
        .spyOn(commentsService, 'create')
        .mockResolvedValue(mockComment);
      const result = await controller.create(dto);
      expect(result).toEqual(mockComment);
      expect(createSpy).toHaveBeenCalledWith(dto);
    });

    it('should handle missing required fields', async () => {
      jest
        .spyOn(commentsService, 'create')
        .mockImplementation((dto: CreateCommentDto) => {
          if (!dto.user_id || !dto.post_id) {
            return Promise.reject(new Error('Missing required fields'));
          }
          return Promise.resolve(mockComment);
        });
      const invalidDto = { content: 'Test comment' };
      const createPromise = controller.create(invalidDto as CreateCommentDto);
      await expect(createPromise).rejects.toThrow('Missing required fields');
    });
  });

  describe('findAll', () => {
    it('should return all comments', async () => {
      const findAllSpy = jest
        .spyOn(commentsService, 'findAll')
        .mockResolvedValue(mockComments);
      const result = await controller.findAll();
      expect(result).toEqual(mockComments);
      expect(findAllSpy).toHaveBeenCalled();
    });

    it('should return empty array when no comments exist', async () => {
      const findAllSpy = jest
        .spyOn(commentsService, 'findAll')
        .mockResolvedValue([]);
      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a comment when valid ID is provided', async () => {
      const findOneSpy = jest
        .spyOn(commentsService, 'findOne')
        .mockResolvedValue(mockComment);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockComment);
      expect(findOneSpy).toHaveBeenCalledWith(1);
    });

    it('should handle non-existent comment ID', async () => {
      jest.spyOn(commentsService, 'findOne').mockResolvedValueOnce(null);
      const result = await controller.findOne('999');
      expect(result).toBeNull();
    });

    it('should handle invalid ID format', async () => {
      jest
        .spyOn(commentsService, 'findOne')
        .mockImplementation((id: number) => {
          if (isNaN(id)) {
            return Promise.reject(new Error('Invalid ID'));
          }
          return Promise.resolve(mockComment);
        });
      const findOnePromise = controller.findOne('invalid');
      await expect(findOnePromise).rejects.toThrow('Invalid ID');
    });
  });

  describe('update', () => {
    it('should update and return the comment', async () => {
      const dto: UpdateCommentDto = { content: 'Updated' };
      const updateSpy = jest
        .spyOn(commentsService, 'updateOne')
        .mockResolvedValue(
          Object.assign(new Comment(), mockComment, {
            content: 'Updated',
          }),
        );

      const result = await controller.update('1', dto);

      expect(result).toEqual(
        Object.assign(new Comment(), mockComment, {
          content: 'Updated',
        }),
      );
      expect(updateSpy).toHaveBeenCalledWith(1, dto);
    });

    it('should handle empty update data', async () => {
      const emptyDto = {};
      const updateSpy = jest
        .spyOn(commentsService, 'updateOne')
        .mockRejectedValue(new Error('Invalid update data'));

      const updatePromise = controller.update(
        '1',
        emptyDto as UpdateCommentDto,
      );
      await expect(updatePromise).rejects.toThrow('Invalid update data');
      expect(updateSpy).toHaveBeenCalledWith(1, emptyDto);
    });
  });

  describe('remove', () => {
    it('should remove existing comment', async () => {
      const deleteSpy = jest
        .spyOn(commentsService, 'deleteOne')
        .mockResolvedValue(mockComment);

      const result = await controller.remove('1');

      expect(result).toEqual(mockComment);
      expect(deleteSpy).toHaveBeenCalledWith(1);
    });

    it('should handle non-existent comment deletion', async () => {
      const deleteSpy = jest
        .spyOn(commentsService, 'deleteOne')
        .mockRejectedValue(new Error('Comment not found'));

      const deletePromise = controller.remove('999');
      await expect(deletePromise).rejects.toThrow('Comment not found');
      expect(deleteSpy).toHaveBeenCalledWith(999);
    });
  });
});
