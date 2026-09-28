import { PartialType } from '@nestjs/mapped-types';
import { CreateListingPhotoDto } from './create-listing-photo.dto.js';

export class UpdateListingPhotoDto extends PartialType(CreateListingPhotoDto) {}
