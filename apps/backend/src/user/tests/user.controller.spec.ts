import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { JwtUtil } from '../../utils/jwt.util';
import { UserController } from '../controllers/user.controller';
import {
  mockUser,
  mockUserArray,
  mockUserWithLinks,
  mockUserWithLinksArray,
} from './user.mock';
import { Request } from 'express';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let jwtUtil: JwtUtil;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue({ data: mockUserWithLinks }),
            findAll: jest
              .fn()
              .mockResolvedValue({ data: mockUserWithLinksArray }),
            findOne: jest.fn().mockResolvedValue({ data: mockUserWithLinks }),
            update: jest.fn().mockResolvedValue({ data: mockUserWithLinks }),
            remove: jest
              .fn()
              .mockResolvedValue({ message: 'User deleted successfully' }),
          },
        },
        {
          provide: JwtUtil,
          useValue: {
            verify: jest.fn().mockReturnValue({ sub: '1' }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    jwtUtil = module.get<JwtUtil>(JwtUtil);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { ...mockUser, password: 'password' };
    const result = await controller.create(dto);
    expect(result?.data.email).toEqual(mockUser.email);
    expect(userService.create).toHaveBeenCalledWith(dto);
  });

  it('should find all users', async () => {
    const result = await controller.findAll('1', '25');
    if (Array.isArray(result?.data)) {
      expect(result.data.length).toBe(1);
    } else {
      fail('Expected result.data to be an array');
    }
    expect(userService.findAll).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const result = await controller.findOne('1');
    expect(result.data.id).toEqual(1);
    expect(userService.findOne).toHaveBeenCalledWith(1);
  });

  it('should find current user (me)', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer faketoken',
      },
    } as Request;

    const result = await controller.findMe(mockRequest);
    expect(result.data.id).toEqual(1);
    expect(userService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a user', async () => {
    const dto = { firstname: 'UpdatedName' };
    const result = await controller.update('1', dto);
    expect(result?.data?.id).toEqual(1);
    expect(userService.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a user', async () => {
    const result = await controller.remove('1');
    expect(result.message).toContain('deleted successfully');
    expect(userService.remove).toHaveBeenCalledWith(1);
  });
});
