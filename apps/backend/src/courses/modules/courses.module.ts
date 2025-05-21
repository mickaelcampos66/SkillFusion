import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/modules/auth.module';
import { CoursesController } from '../controllers/courses.controller';
import { CoursesService } from '../services/courses.service';
import { JwtCustomModule } from 'src/utils/jwt.module';

@Module({
  imports: [AuthModule, JwtCustomModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
