import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '@entity/entities'; 

@Injectable()
export class DevGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Debes iniciar sesión para realizar esta acción');
    }

    if (user.role !== UserRole.DEV) {
      throw new ForbiddenException('Solo los desarolladores pueden realizar esta acción');
    }

    return true;
  }
}