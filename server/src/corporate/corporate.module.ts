import { Module } from '@nestjs/common';
import { CorporateController } from './corporate.controller.js';
import { CorporateService } from './corporate.service.js';

@Module({
  controllers: [CorporateController],
  providers: [CorporateService]
})
export class CorporateModule {}
