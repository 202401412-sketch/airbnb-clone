import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListingAvailabilityService } from './listing-availability.service.js';
import { CreateListingAvailabilityDto } from './dto/create-listing-availability.dto.js';
import { UpdateListingAvailabilityDto } from './dto/update-listing-availability.dto.js';

@Controller('listing-availability')
export class ListingAvailabilityController {
  constructor(private readonly listingAvailabilityService: ListingAvailabilityService) {}

  @Post()
  create(@Body() createListingAvailabilityDto: CreateListingAvailabilityDto) {
    return this.listingAvailabilityService.create(createListingAvailabilityDto);
  }

  @Get()
  findAll() {
    return this.listingAvailabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingAvailabilityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingAvailabilityDto: UpdateListingAvailabilityDto) {
    return this.listingAvailabilityService.update(+id, updateListingAvailabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingAvailabilityService.remove(+id);
  }
}
