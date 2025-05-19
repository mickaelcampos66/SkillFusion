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
            register: jest.fn(() => {
              return {
                message: 'User registered successfully',
                id: 1,
                firstname: 'John',
                lastname: 'Doe',
                accessToken: 'fake-jwt-token',
              };
            }),
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
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        accessToken: 'fake-jwt-token',
      };

      const registerSpy = jest
        .spyOn(authService, 'register')
        .mockResolvedValue(registerResult);
      const result = await authController.register(dto);

      expect(registerSpy).toHaveBeenCalledWith(dto);
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
      jest.spyOn(authService, 'register').mockRejectedValue(error);

      await expect(authController.register(dto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(authController.register(dto)).rejects.toThrow(
        'Email already in use',
      );
    });
  });
});
