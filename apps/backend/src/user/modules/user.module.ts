import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { PrismaService } from '../../prisma.service';
import { UserController } from '../controllers/user.controller';
import { JwtCustomModule } from '../../utils/jwt.module';

@Module({
  imports: [JwtCustomModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
