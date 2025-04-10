import { PrismaService } from '../../prisma.service';
import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/modules/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class CategoriesModule {}
