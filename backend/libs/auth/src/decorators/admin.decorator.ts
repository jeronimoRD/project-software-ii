import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';

export function AdminOnly() {
  return applyDecorators(UseGuards(AuthGuard('jwt'), AdminGuard));
}