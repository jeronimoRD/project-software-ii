import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '@entity/entities'; 

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest(); // Retrieve the HTTP request object from the context
    const user = request.user; // Access the user object from the request

    if (!user) {
      throw new UnauthorizedException('Debes iniciar sesión para realizar esta acción'); // Throw an exception if the user is not authenticated
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.DEV) {
      throw new ForbiddenException('Solo los administradores o desarolladores pueden realizar esta acción'); // Throw an exception if the user does not have the required role
    }

    return true; // Allow access if the user is authenticated and has the correct role
  }
}
