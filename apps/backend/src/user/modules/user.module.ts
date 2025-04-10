import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { PrismaService } from 'src/prisma.service';
import { UserController } from '../controllers/user.controller';
import { JwtCustomModule } from 'src/utils/jwt.module';

@Module({
  imports: [JwtCustomModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
