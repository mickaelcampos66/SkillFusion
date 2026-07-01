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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue({ data: mockUser }),
            findAll: jest.fn().mockResolvedValue({ data: mockUserArray }),
            findOne: jest.fn().mockResolvedValue({ data: mockUser }),
            update: jest.fn().mockResolvedValue({ data: mockUser }),
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
    jest.spyOn(userService, 'create');
    jest.spyOn(userService, 'findAll');
    jest.spyOn(userService, 'findOne');
    jest.spyOn(userService, 'update');
    jest.spyOn(userService, 'remove');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { ...mockUser, password: 'password' };

    const createSpy = jest.spyOn(userService, 'create').mockResolvedValue({
      data: mockUserWithLinks,
      message: 'User created successfully',
    });

    const result = await controller.create(dto);
    expect(result?.data.email).toEqual(mockUserWithLinks.email);
    expect(result?.data.links).toBeDefined();
    expect(result?.data.links.self).toBe('/users/1');
    expect(result?.message).toBe('User created successfully');

    expect(createSpy).toHaveBeenCalledWith(dto);
  });

  it('should find all users', async () => {
    const findAllSpy = jest.spyOn(userService, 'findAll').mockResolvedValue({
      data: mockUserWithLinksArray,
      message: 'Users retrieved successfully',
    });
    const result = await controller.findAll('1', '25');
    expect(result?.data.length).toBe(1);
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const findOneSpy = jest.spyOn(userService, 'findOne').mockResolvedValue({
      data: mockUserWithLinks,
      message: 'User retrieved successfully',
    });
    const result = await controller.findOne('1');
    expect(result.data.id).toEqual(1);
    expect(findOneSpy).toHaveBeenCalledWith(1);
  });

  it('should find current user (me)', async () => {
    const findMeSpy = jest.spyOn(userService, 'findOne').mockResolvedValue({
      data: mockUserWithLinks,
      message: 'User retrieved successfully',
    });
    const mockRequest = {
      headers: {
        authorization: 'Bearer faketoken',
      },
    } as Request;

    const result = await controller.findMe(mockRequest);
    expect(result.data.id).toEqual(1);
    expect(findMeSpy).toHaveBeenCalledWith(1);
  });

  it('should update a user', async () => {
    const updateSpy = jest.spyOn(userService, 'update').mockResolvedValue({
      data: mockUserWithLinks,
      message: 'User updated successfully',
    });
    const dto = { firstname: 'UpdatedName' };
    const result = await controller.update('1', dto);
    expect(result?.data?.id).toEqual(1);
    expect(updateSpy).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a user', async () => {
    const deleteSpy = jest.spyOn(userService, 'remove').mockResolvedValue({
      data: undefined,
      message: 'User deleted successfully',
    });
    const result = await controller.remove('1');
    expect(result.message).toContain('deleted successfully');
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
