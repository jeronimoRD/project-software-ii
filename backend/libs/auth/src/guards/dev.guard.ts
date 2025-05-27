import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '@entity/entities'; 

@Injectable()
export class DevGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Retrieve the HTTP request object from the execution context
    const request = context.switchToHttp().getRequest();
    // Access the user object from the request
    const user = request.user;

    // Check if the user is not authenticated
    if (!user) {
      // Throw an UnauthorizedException if the user is not logged in
      throw new UnauthorizedException('Debes iniciar sesión para realizar esta acción');
    }

    // Check if the user's role is not 'DEV'
    if (user.role !== UserRole.DEV) {
      // Throw a ForbiddenException if the user does not have the required role
      throw new ForbiddenException('Solo los desarolladores pueden realizar esta acción');
    }

    // Allow access if the user is authenticated and has the correct role
    return true;
  }
}
