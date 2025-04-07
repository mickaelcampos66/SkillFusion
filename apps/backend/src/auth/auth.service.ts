import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "../prisma.service";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async register(dto: RegisterDto) {
        const userExists = await this.prisma.user.findUnique({
          where: { email: dto.email },
        });
    
        if (userExists) throw new BadRequestException('Email already in use');
    
        const hashedPassword = await bcrypt.hash(dto.password, 10);
    
        const user = await this.prisma.user.create({
          data: {
            firstname: dto.firstname,
            lastname: dto.lastname,
            email: dto.email,
            password: hashedPassword,
            role: {
              connect: { name: 'user' },
            },
          },
        });
    
        return { message: 'User registered successfully', userId: user.id };
      }
}