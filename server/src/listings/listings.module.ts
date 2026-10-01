import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsService } from './listings.service.js';
import { ListingsController } from './listings.controller.js';
import { Listing } from './entities/listing.entity.js';
import { ListingPhoto } from '../listing-photos/entities/listing-photo.entity.js';
import { ListingPhotosModule } from '../listing-photos/listing-photos.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing, ListingPhoto]),
    ListingPhotosModule,
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService, TypeOrmModule],
})
export class ListingsModule {}
