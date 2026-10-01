import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ListingPhotosService } from './listing-photos.service.js';
import { CreateListingPhotoDto } from './dto/create-listing-photo.dto.js';

@Controller(['api/listing-photos', 'listing-photos'])
export class ListingPhotosController {
  constructor(private readonly photosService: ListingPhotosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPhotoDto: CreateListingPhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Get('listing/:listingId')
  findByListing(@Param('listingId') listingId: string) {
    return this.photosService.findByListingId(listingId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(id);
  }
}
