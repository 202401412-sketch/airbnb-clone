import { Test, TestingModule } from '@nestjs/testing';
import { ListingAvailabilityService } from './listing-availability.service.js';

describe('ListingAvailabilityService', () => {
  let service: ListingAvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListingAvailabilityService],
    }).compile();

    service = module.get<ListingAvailabilityService>(ListingAvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
