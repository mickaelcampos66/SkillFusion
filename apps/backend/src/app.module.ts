import { Module } from '@nestjs/common';
import { AuthModule } from './auth/modules/auth.module';
import { CoursesModule } from './courses/modules/courses.module';

@Module({
  imports: [AuthModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
