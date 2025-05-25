import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '@entity/entities'; 

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Debes iniciar sesión para realizar esta acción');
    }

    console.log(user.role);
    if (user.role !== UserRole.admin) {
      throw new ForbiddenException('Solo los administradores pueden realizar esta acción');
    }

    return true;
  }
}