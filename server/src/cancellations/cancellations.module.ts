import { Module } from '@nestjs/common';
import { CancellationsService } from './cancellations.service.js';
import { CancellationsController } from './cancellations.controller.js';

@Module({
  controllers: [CancellationsController],
  providers: [CancellationsService],
})
export class CancellationsModule {}
