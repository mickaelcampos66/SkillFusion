import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtUtil } from './jwt.util';
import * as process from 'process';

@Module({
  imports: [
    NestJwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
  ],
  providers: [JwtUtil],
  exports: [NestJwtModule, JwtUtil],
})
export class JwtCustomModule {}
