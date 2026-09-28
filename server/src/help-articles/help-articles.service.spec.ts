import { Test, TestingModule } from '@nestjs/testing';
import { HelpArticlesService } from './help-articles.service.js';

describe('HelpArticlesService', () => {
  let service: HelpArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpArticlesService],
    }).compile();

    service = module.get<HelpArticlesService>(HelpArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
