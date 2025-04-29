import { Module } from '@nestjs/common';
import { AuthModule } from './auth/modules/auth.module';
import { UserModule } from './user/modules/user.module';
import { CoursesModule } from './courses/modules/courses.module';
import { HealthChkModule } from './healthchk/modules/healthchk.module';

@Module({
  imports: [AuthModule, UserModule, CoursesModule, HealthChkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
