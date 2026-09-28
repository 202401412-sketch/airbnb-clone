import { Test, TestingModule } from '@nestjs/testing';
import { ListingAvailabilityController } from './listing-availability.controller.js';
import { ListingAvailabilityService } from './listing-availability.service.js';

describe('ListingAvailabilityController', () => {
  let controller: ListingAvailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingAvailabilityController],
      providers: [ListingAvailabilityService],
    }).compile();

    controller = module.get<ListingAvailabilityController>(ListingAvailabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
