import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from '../controllers/auth.controller';
import { JwtCustomModule } from 'src/utils/jwt.module';

@Module({
  imports: [JwtCustomModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
