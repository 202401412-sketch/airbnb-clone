import { Test, TestingModule } from '@nestjs/testing';
import { ListingPhotosService } from './listing-photos.service.js';

describe('ListingPhotosService', () => {
  let service: ListingPhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListingPhotosService],
    }).compile();

    service = module.get<ListingPhotosService>(ListingPhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
