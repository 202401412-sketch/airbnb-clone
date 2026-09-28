import { Module } from '@nestjs/common';
import { ListingAvailabilityService } from './listing-availability.service.js';
import { ListingAvailabilityController } from './listing-availability.controller.js';

@Module({
  controllers: [ListingAvailabilityController],
  providers: [ListingAvailabilityService],
})
export class ListingAvailabilityModule {}
