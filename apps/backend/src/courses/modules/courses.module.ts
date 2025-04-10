import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/modules/auth.module';
import { PrismaService } from 'src/prisma.service';
import { CoursesController } from '../controllers/courses.controller';
import { CoursesService } from '../services/courses.service';

@Module({
  imports: [AuthModule],
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService],
})
export class CoursesModule {}
