import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
})

export class AuthModule {}