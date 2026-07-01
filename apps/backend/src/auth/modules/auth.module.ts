import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { JwtCustomModule } from 'src/utils/jwt.module';

@Module({
  imports: [JwtCustomModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
