import { BadRequestException, Body, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { PrismaService } from "src/prisma.service";
import { RegisterDto } from "../dto/register.dto";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async register(dto: RegisterDto) {
      try {
          const userExists = await this.prisma.user.findUnique({
            where: { email: dto.email },
          });
      
          if (userExists) throw new BadRequestException('Email already in use');
          if (dto.password) throw new BadRequestException('Password is required');

          const hashedPassword = await bcrypt.hash(dto.password, 10);
          
          const user = await this.prisma.user.create({
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
      
          return { message: 'User registered successfully', userId: user.id };
        
      } catch (error) {
        const errorMessage = error instanceof BadRequestException ? error.message : 'Internal server error';
        throw new BadRequestException(errorMessage);
      }
      }
}