import { Test, TestingModule } from '@nestjs/testing';
import { HelpArticlesController } from './help-articles.controller.js';
import { HelpArticlesService } from './help-articles.service.js';

describe('HelpArticlesController', () => {
  let controller: HelpArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelpArticlesController],
      providers: [HelpArticlesService],
    }).compile();

    controller = module.get<HelpArticlesController>(HelpArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
