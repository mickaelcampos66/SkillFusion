import { PrismaService } from '../../prisma.service';
import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/modules/auth.module';
import { CategoriesController } from '../controllers/categories.controller';
import { CategoriesService } from '../services/categories.service';

@Module({
  imports: [AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService,PrismaService],
})
export class CategoriesModule {}
