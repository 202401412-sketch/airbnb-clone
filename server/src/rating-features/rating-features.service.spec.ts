import { Test, TestingModule } from '@nestjs/testing';
import { RatingFeaturesService } from './rating-features.service.js';

describe('RatingFeaturesService', () => {
  let service: RatingFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingFeaturesService],
    }).compile();

    service = module.get<RatingFeaturesService>(RatingFeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
