import { Test, TestingModule } from '@nestjs/testing';
import { RatingFeaturesController } from './rating-features.controller.js';
import { RatingFeaturesService } from './rating-features.service.js';

describe('RatingFeaturesController', () => {
  let controller: RatingFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingFeaturesController],
      providers: [RatingFeaturesService],
    }).compile();

    controller = module.get<RatingFeaturesController>(RatingFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
