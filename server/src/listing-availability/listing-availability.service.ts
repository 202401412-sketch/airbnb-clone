import { Injectable } from '@nestjs/common';
import { CreateListingAvailabilityDto } from './dto/create-listing-availability.dto.js';
import { UpdateListingAvailabilityDto } from './dto/update-listing-availability.dto.js';

@Injectable()
export class ListingAvailabilityService {
  create(createListingAvailabilityDto: CreateListingAvailabilityDto) {
    return 'This action adds a new listingAvailability';
  }

  findAll() {
    return `This action returns all listingAvailability`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listingAvailability`;
  }

  update(id: number, updateListingAvailabilityDto: UpdateListingAvailabilityDto) {
    return `This action updates a #${id} listingAvailability`;
  }

  remove(id: number) {
    return `This action removes a #${id} listingAvailability`;
  }
}
