/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { PrismaService } from '../../prisma.service';
import { mockUser, mockUserArray } from './user.mock';
import { Prisma } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn().mockResolvedValue(mockUserArray),
              count: jest.fn().mockResolvedValue(1),
              findUnique: jest
                .fn()
                .mockImplementation(
                  ({ where }: { where: Prisma.UserWhereUniqueInput }) => {
                    if (where.email) {
                      return null;
                    }
                    return mockUser;
                  },
                ),
              create: jest.fn().mockResolvedValue(mockUser),
              update: jest.fn().mockResolvedValue(mockUser),
              delete: jest.fn().mockResolvedValue(mockUser),
            },
            $transaction: jest.fn().mockResolvedValue([mockUserArray, 1]),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const result = await service.findAll(1, 25);
    expect(result?.data.length).toBe(1);
    expect(prismaService.user.findMany).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const result = await service.findOne(1);
    expect(result.data.id).toEqual(1);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { role: true },
    });
  });

  it('should create a user', async () => {
    const dto = { ...mockUser, password: 'password' };
    const result = await service.create(dto);
    expect(result?.data.email).toEqual(mockUser.email);
    expect(prismaService.user.create).toHaveBeenCalled();
  });

  it('should update a user', async () => {
    const dto = { firstname: 'UpdatedName' };
    const result = await service.update(1, dto);
    expect(result?.data?.firstname).toEqual('John');
    expect(prismaService.user.update).toHaveBeenCalled();
  });

  it('should delete a user', async () => {
    const result = await service.remove(1);
    expect(result.message).toContain('deleted successfully');
    expect(prismaService.user.delete).toHaveBeenCalled();
  });
});
