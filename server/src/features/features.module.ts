import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service.js';
import { FeaturesController } from './features.controller.js';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeaturesModule {}
