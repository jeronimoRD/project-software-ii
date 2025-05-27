import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';

// Function to create a decorator that restricts access to admin users only
export function AdminOnly() {
  // Apply the AuthGuard for JWT authentication and AdminGuard for admin role verification
  return applyDecorators(UseGuards(AuthGuard('jwt'), AdminGuard));
}
