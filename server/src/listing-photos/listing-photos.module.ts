import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingPhotosService } from './listing-photos.service.js';
import { ListingPhotosController } from './listing-photos.controller.js';
import { ListingPhoto } from './entities/listing-photo.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ListingPhoto])],
  controllers: [ListingPhotosController],
  providers: [ListingPhotosService],
  exports: [ListingPhotosService, TypeOrmModule],
})
export class ListingPhotosModule {}
