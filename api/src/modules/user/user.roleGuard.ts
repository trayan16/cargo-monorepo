import { UserRoles } from 'src/modules/user/user.schema';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import JwtAuthenticationGuard from '../auth/jwtAuthentication.guard';

export const RoleGuard = (
  allowAllRoles: boolean,
  role?: UserRoles,
): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      if (allowAllRoles) {
        return user?.role.includes('ADMIN') || user?.role.includes('CLIENT');
      }
      return user?.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
