import { Test, TestingModule } from '@nestjs/testing';
import { ListingPhotosController } from './listing-photos.controller.js';
import { ListingPhotosService } from './listing-photos.service.js';

describe('ListingPhotosController', () => {
  let controller: ListingPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingPhotosController],
      providers: [ListingPhotosService],
    }).compile();

    controller = module.get<ListingPhotosController>(ListingPhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
