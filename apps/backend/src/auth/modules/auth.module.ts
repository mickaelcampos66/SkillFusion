import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from "../services/auth.service";
import { PrismaService } from "src/prisma.service";
import { AuthController } from "../controllers/auth.controller";

@Module({
    imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'dev_secret',
          signOptions: { expiresIn: '12h' },
        }),
      ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
})

export class AuthModule {}