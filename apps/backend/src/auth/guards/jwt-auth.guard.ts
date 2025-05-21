import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { IVerifiedToken } from 'src/interface/IVerifiedToken';
import { JwtUtil } from 'src/utils/jwt.util';

export interface IAuthenticatedRequest extends Request {
  user: IVerifiedToken;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtUtil: JwtUtil) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtUtil.verify(token);
      request.user = decoded;
      return true;
    } catch (err: unknown) {
      throw new UnauthorizedException(
        err instanceof Error ? err.message : JSON.stringify(err),
      );
    }
  }
}
