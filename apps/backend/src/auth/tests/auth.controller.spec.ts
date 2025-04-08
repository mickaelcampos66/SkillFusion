import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { AuthController } from '../controllers/auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signup', () => {
    it('should call AuthService register method', async () => {
      const dto: RegisterDto = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'test@example.com',
        password: 'password123',
        phone_number: '1234567890',
        address: '123 Main St',
      };

      const registerResult = {
        message: 'User registered successfully',
        userId: 1,
      };

      authService.register = jest.fn().mockResolvedValue(registerResult);

      const result = await authController.register(dto);

      expect(authService.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(registerResult);
    });

    it('should throw BadRequestException if register fails', async () => {
      const dto: RegisterDto = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'test@example.com',
        password: 'password123',
        phone_number: '1234567890',
        address: '123 Main St',
      };

      const error = new BadRequestException('Email already in use');
      authService.register = jest.fn().mockRejectedValue(error);

      try {
        await authController.register(dto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('Email already in use');
      }
    });
  });
});
