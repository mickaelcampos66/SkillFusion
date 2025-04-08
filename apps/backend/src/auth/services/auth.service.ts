import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { PrismaService } from "../../prisma.service";
import { RegisterDto } from "../dto/register.dto";
import { PrismaUser } from "../../type/prisma";
import { JwtUtil } from "../../utils/jwt.util";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async register(dto: RegisterDto) {
      try {
          const userExists = await this.prisma.user.findUnique({
            where: { email: dto.email },
          });
      
          if (userExists) throw new BadRequestException('Email already in use');

          const hashedPassword = await bcrypt.hash(dto.password, 10);

          await this.prisma.user.create({
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

          const userData: PrismaUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
            include: { role: true },
          });
      
          if (!userData || !userData.role) {
            throw new Error('User role could not be loaded');
          }
      
          const payload = {
            sub: userData.id,
            firstName: userData.firstname,
            lastName: userData.lastname,
            email: userData.email,
            role: userData.role.name,
          };
      
          const token = JwtUtil.sign(payload);
      
          return {
            message: 'User registered successfully',
            userId: userData.id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            accessToken: token,
          };
        
      } catch (error) {
        const errorMessage = error instanceof BadRequestException ? error.message : 'Internal server error';
        throw new BadRequestException(errorMessage);
      }
      }
}