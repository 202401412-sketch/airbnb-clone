import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListingPhotosService } from './listing-photos.service.js';
import { CreateListingPhotoDto } from './dto/create-listing-photo.dto.js';
import { UpdateListingPhotoDto } from './dto/update-listing-photo.dto.js';

@Controller('listing-photos')
export class ListingPhotosController {
  constructor(private readonly listingPhotosService: ListingPhotosService) {}

  @Post()
  create(@Body() createListingPhotoDto: CreateListingPhotoDto) {
    return this.listingPhotosService.create(createListingPhotoDto);
  }

  @Get()
  findAll() {
    return this.listingPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingPhotoDto: UpdateListingPhotoDto) {
    return this.listingPhotosService.update(+id, updateListingPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingPhotosService.remove(+id);
  }
}
