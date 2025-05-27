import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  // Registering EmailService as a provider for dependency injection
  providers: [EmailService],
  // Exporting EmailService to make it available for other modules
  exports: [EmailService],
})
export class EmailModule {}
