import { Module } from '@nestjs/common';
import { AuthModule } from './auth/modules/auth.module';
import { UserModule } from './user/modules/user.module';
import { CoursesModule } from './courses/modules/courses.module';
import { CategoriesModule } from './categories/modules/categories.module';

@Module({
  imports: [AuthModule, UserModule, CoursesModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
