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

  beforeEach(() => {
    prismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    } as unknown as PrismaService;

    jwtService = new JwtService({
      secret: 'test-secret',
    }) as jest.Mocked<JwtService>;

    authService = new AuthService(prismaService, jwtService);
  });

  describe('register', () => {
    it('should throw error if email already exists', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        email: 'test@example.com',
      });

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

    // it('should create a user successfully and return JWT', async () => {
    //   // Simuler le hachage du mot de passe
    //   (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    //   // Moquer la méthode findUnique pour retourner null (aucun utilisateur trouvé)
    //   (prismaService.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    //   // Moquer la création de l'utilisateur
    //   (prismaService.user.create as jest.Mock).mockResolvedValue({
    //     id: 1,
    //     firstname: 'John',
    //     lastname: 'Doe',
    //     email: 'test@example.com',
    //     password: 'hashedPassword',
    //   });

    //   // Moquer la génération du JWT
    //   (jwtService.sign as jest.Mock).mockReturnValue('fake-jwt-token');

    //   const dto = {
    //     firstname: 'John',
    //     lastname: 'Doe',
    //     email: 'test@example.com',
    //     password: 'password123',
    //     phone_number: '1234567890',
    //     address: '123 Main St',
    //   };

    //   const result = await authService.register(dto);

    //   expect(result).toEqual({
    //     message: 'User registered successfully',
    //     id: 1,  // Changer userId en id
    //     firstname: 'John',
    //     lastname: 'Doe',
    //     accessToken: 'fake-jwt-token',
    //   });

    //   expect(prismaService.user.create).toHaveBeenCalledWith({
    //     data: {
    //       firstname: dto.firstname,
    //       lastname: dto.lastname,
    //       email: dto.email,
    //       password: 'hashedPassword',  // Vérifie que le mot de passe est haché
    //       role: { connect: { id: 1 } },
    //     },
    //   });

    //   expect(jwtService.sign).toHaveBeenCalledWith({
    //     sub: 1,
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'test@example.com',
    //     role: 'USER',
    //   });
    // });

    it('should throw BadRequestException if create user fails', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      (prismaService.user.create as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

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
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(BadRequestException);

      // Ajouter 'include' dans l'appel attendu
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        include: { role: true }, // Assurez-vous que le rôle est inclus
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

      // Ajouter l'inclusion du rôle dans la méthode findUnique
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(userData);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Simuler la comparaison de mot de passe

      (jwtService.sign as jest.Mock).mockReturnValue('fake-jwt-token');

      const dto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(dto);

      expect(result).toEqual({
        message: 'Login successful',
        id: 1, // Changer userId en id
        firstname: 'John',
        lastname: 'Doe',
        accessToken: 'fake-jwt-token',
      });

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
        include: { role: true }, // Ajouter l'inclusion du rôle dans la requête
      });

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: userData.id,
        firstName: userData.firstname,
        lastName: userData.lastname,
        email: userData.email,
        role: userData.role.name,
      });
    });
  });
});
