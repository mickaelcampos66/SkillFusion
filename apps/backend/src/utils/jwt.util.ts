import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IVerifiedToken } from 'src/interface/IVerifiedToken';

@Injectable()
export class JwtUtil {
  private static readonly EXPIRES_IN = process.env.EXPIRES_IN;

  constructor(private readonly jwtService: JwtService) {}

  sign(payload: object): string {
    return this.jwtService.sign(payload, {
      expiresIn: JwtUtil.EXPIRES_IN,
    });
  }

  verify(token: string): IVerifiedToken {
    try {
      return this.jwtService.verify(token);
    } catch (err: unknown) {
      throw new Error(err instanceof Error ? err.message : JSON.stringify(err));
    }
  }
}
