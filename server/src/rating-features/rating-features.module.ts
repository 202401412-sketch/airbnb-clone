import { Module } from '@nestjs/common';
import { RatingFeaturesService } from './rating-features.service.js';
import { RatingFeaturesController } from './rating-features.controller.js';

@Module({
  controllers: [RatingFeaturesController],
  providers: [RatingFeaturesService],
})
export class RatingFeaturesModule {}
