import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../services/auth.service';
import { PrismaService } from '../../prisma.service';

jest.mock('../../prisma.service');
jest.mock('@nestjs/jwt');
jest.mock('bcryptjs');
describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  let findUniqueMock: jest.Mock;
  let createMock: jest.Mock;
  let jwtSignMock: jest.Mock;

  beforeEach(() => {
    findUniqueMock = jest.fn();
    createMock = jest.fn();
    jwtSignMock = jest.fn();

    prismaService = {
      user: {
        findUnique: findUniqueMock,
        create: createMock,
      },
    } as unknown as PrismaService;

    jwtService = {
      sign: jwtSignMock,
    } as unknown as JwtService;

    authService = new AuthService(prismaService, jwtService);
  });

  describe('register', () => {
    it('should throw error if email already exists', async () => {
      findUniqueMock.mockResolvedValue({ email: 'test@example.com' });

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
    });

    it('should throw BadRequestException if create user fails', async () => {
      findUniqueMock.mockResolvedValueOnce(null);
      createMock.mockRejectedValue(new Error('Database error'));

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
    });
  });

  describe('login', () => {
    it('should throw error if credentials are invalid', async () => {
      findUniqueMock.mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(findUniqueMock).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        include: { role: true },
      });
    });

    it('should return JWT if login is successful', async () => {
      const userData = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: { name: 'USER' },
      };

      findUniqueMock.mockResolvedValue(userData);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtSignMock.mockReturnValue('fake-jwt-token');

      const dto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(dto);

      expect(result).toEqual({
        message: 'Login successful',
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        accessToken: 'fake-jwt-token',
      });

      expect(findUniqueMock).toHaveBeenCalledWith({
        where: { email: dto.email },
        include: { role: true },
      });

      expect(jwtSignMock).toHaveBeenCalledWith({
        sub: userData.id,
        firstName: userData.firstname,
        lastName: userData.lastname,
        email: userData.email,
        role: userData.role.name,
      });
    });
  });
});
