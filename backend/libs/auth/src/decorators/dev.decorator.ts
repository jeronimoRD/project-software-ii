import { applyDecorators, UseGuards } from '@nestjs/common';
import { DevGuard } from '../guards/dev.guard';
import { AuthGuard } from '@nestjs/passport';

// Function to create a decorator that applies authentication and authorization guards
export function DevOnly() {
  // Apply the AuthGuard for JWT authentication and the DevGuard for developer authorization
  return applyDecorators(UseGuards(AuthGuard('jwt'), DevGuard));
}
