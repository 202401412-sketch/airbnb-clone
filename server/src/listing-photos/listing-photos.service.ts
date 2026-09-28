import { Injectable } from '@nestjs/common';
import { CreateListingPhotoDto } from './dto/create-listing-photo.dto.js';
import { UpdateListingPhotoDto } from './dto/update-listing-photo.dto.js';

@Injectable()
export class ListingPhotosService {
  create(createListingPhotoDto: CreateListingPhotoDto) {
    return 'This action adds a new listingPhoto';
  }

  findAll() {
    return `This action returns all listingPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listingPhoto`;
  }

  update(id: number, updateListingPhotoDto: UpdateListingPhotoDto) {
    return `This action updates a #${id} listingPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} listingPhoto`;
  }
}
