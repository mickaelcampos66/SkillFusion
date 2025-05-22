import { Module } from '@nestjs/common';
import { AuthModule } from './auth/modules/auth.module';
import { UserModule } from './user/modules/user.module';
import { CoursesModule } from './courses/modules/courses.module';

import { CategoriesModule } from './categories/modules/categories.module';
import { HealthChkModule } from './healthchk/modules/healthchk.module';
import { PostModule } from './posts/modules/post.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CoursesModule,
    HealthChkModule,
    CategoriesModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
