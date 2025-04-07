import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/modules/auth.module';
import { CoursesModule } from './modules/courses.module';

@Module({
  imports: [AuthModule, CoursesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {} 
