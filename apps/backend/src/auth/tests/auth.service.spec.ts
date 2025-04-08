import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { BadRequestException } from '@nestjs/common';
import { JwtUtil } from '../../utils/jwt.util';
import { PrismaService } from '../../prisma.service';

jest.mock('../../utils/jwt.util');

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should throw error if email already exists', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

      await expect(
        authService.register({
          firstname: 'John',
          lastname: 'Doe',
          email: 'test@example.com',
          password: 'password123',
          phone_number: '1234567890',
          address: '123 Main St',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should create a user successfully and return JWT', async () => {
      (prismaService.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(null) // email check
        .mockResolvedValueOnce({
          id: 1,
          firstname: 'John',
          lastname: 'Doe',
          email: 'test@example.com',
          password: 'hashedPassword',
          role: { name: 'USER' },
        });

      (prismaService.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'test@example.com',
        password: 'hashedPassword',
      });

      (JwtUtil.sign as jest.Mock).mockReturnValue('fake-jwt-token');

      const dto = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'test@example.com',
        password: 'password123',
        phone_number: '1234567890',
        address: '123 Main St',
      };

      const result = await authService.register(dto);

      expect(result).toEqual({
        message: 'User registered successfully',
        userId: 1,
        firstname: 'John',
        lastname: 'Doe',
        accessToken: 'fake-jwt-token',
      });

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          firstname: dto.firstname,
          lastname: dto.lastname,
          email: dto.email,
          password: expect.any(String),
          role: { connect: { id: 1 } },
        },
      });

      expect(JwtUtil.sign).toHaveBeenCalledWith({
        sub: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        role: 'USER',
      });
    });
  });
});
