import { Module } from '@nestjs/common';
import { ListingPhotosService } from './listing-photos.service.js';
import { ListingPhotosController } from './listing-photos.controller.js';

@Module({
  controllers: [ListingPhotosController],
  providers: [ListingPhotosService],
})
export class ListingPhotosModule {}
