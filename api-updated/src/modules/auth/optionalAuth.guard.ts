import { createParamDecorator, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const UserReq = createParamDecorator((data, req) => {
  return req.user;
});

@Injectable()
export class OptionalAuth extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // no error is thrown if no user is found
    return user;
  }
}
