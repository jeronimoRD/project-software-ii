import { applyDecorators, UseGuards } from '@nestjs/common';
import { DevGuard } from '../guards/dev.guard';
import { AuthGuard } from '@nestjs/passport';

export function DevOnly() {
  return applyDecorators(UseGuards(AuthGuard('jwt'), DevGuard));
}