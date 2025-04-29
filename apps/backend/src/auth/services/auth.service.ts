import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma.service';
import { RegisterDto } from '../dto/register.dto';
import { PrismaUser } from '../../type/prisma';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from 'src/interface/IPayload';
import { IUser } from 'src/interface/IUser';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const userExists: IUser | null = await this.findUserByEmail(dto.email);
      if (userExists) throw new BadRequestException('Email already in use');

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      await this.createUser(dto, hashedPassword);

      const userData: IUser | null = await this.findUserByEmail(dto.email);
      if (!userData) throw new BadRequestException('User not found');
      const payload: IPayload = this.createJwtPayload(userData);
      const token: string = this.jwtService.sign(payload);

      return {
        message: 'User registered successfully',
        id: userData.id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        accessToken: token,
      };
    } catch (error: unknown) {
      this.handleError(error);
      return;
    }
  }

  async login(dto: LoginDto) {
    try {
      const userData: IUser | null = await this.findUserByEmail(dto.email);
      if (!userData) throw new BadRequestException('Invalid credentials');

      const isPasswordValid = await bcrypt.compare(
        dto.password,
        userData.password,
      );
      if (!isPasswordValid)
        throw new BadRequestException('Invalid credentials');

      const payload: IPayload = this.createJwtPayload(userData);
      const token: string = this.jwtService.sign(payload);

      return {
        message: 'Login successful',
        id: userData.id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        accessToken: token,
      };
    } catch (error: unknown) {
      this.handleError(error);
      return;
    }
  }

  private async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) return null;

    return {
      ...user,
      role: {
        ...user.role,
      },
    } as IUser;
  }

  private async createUser(
    dto: RegisterDto,
    hashedPassword: string,
  ): Promise<PrismaUser> {
    return this.prisma.user.create({
      data: {
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        password: hashedPassword,
        role: {
          connect: { id: 1 },
        },
      },
    });
  }

  private createJwtPayload(userData: IUser) {
    return {
      sub: userData.id,
      firstName: userData.firstname,
      lastName: userData.lastname,
      email: userData.email,
      role: userData.role?.name,
    };
  }

  private handleError(error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    throw new BadRequestException(errorMessage);
  }
}
