import { Module } from '@nestjs/common';
import { HelpArticlesService } from './help-articles.service.js';
import { HelpArticlesController } from './help-articles.controller.js';

@Module({
  controllers: [HelpArticlesController],
  providers: [HelpArticlesService],
})
export class HelpArticlesModule {}
