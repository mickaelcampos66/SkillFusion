import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

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
      prismaService.user.findUnique = jest.fn().mockResolvedValue({ email: 'test@example.com' });

      try {
        await authService.register({
          firstname: 'John',
          lastname: 'Doe',
          email: 'test@example.com',
          password: 'password123',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Email already in use');
      }
    });

    it('should create a user successfully', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(null);
      prismaService.user.create = jest.fn().mockResolvedValue({
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'test@example.com',
        password: 'hashedPassword',
      });

      const dto = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.register(dto);

      expect(result).toEqual({
        message: 'User registered successfully',
        userId: 1,
      });

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          firstname: dto.firstname,
          lastname: dto.lastname,
          email: dto.email,
          password: expect.any(String), // hashed password
          role: {
            connect: { id: 1 },
          },
        },
      });
    });

    it('should throw an error if password is not provided', async () => {
      try {
        await authService.register({
          firstname: 'John',
          lastname: 'Doe',
          email: 'test@example.com',
          password: '',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Password is required');
      }
    });
  });
});
