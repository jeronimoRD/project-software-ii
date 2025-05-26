import { applyDecorators, UseGuards } from '@nestjs/common';
import { DevGuard } from '../guards/dev.guard';

export function DevOnly() {
  return applyDecorators(UseGuards(DevGuard));
}