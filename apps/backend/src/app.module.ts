import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/courses.module';

@Module({
  imports: [CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {} 
