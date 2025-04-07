import { Module } from '@nestjs/common';
import { CoursesController } from 'src/controllers/courses.controller';
import { CoursesService } from 'src/services/courses.service';

@Module({
  imports: [],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
