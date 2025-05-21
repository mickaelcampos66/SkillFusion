import { IVerifiedToken } from 'src/interface/IVerifiedToken';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (
    data: keyof IVerifiedToken | undefined,
    ctx: ExecutionContext,
  ): IVerifiedToken[keyof IVerifiedToken] | IVerifiedToken | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: IVerifiedToken }>();
    if (!request.user) {
      return undefined;
    }
    return data ? request.user[data] : request.user;
  },
);
