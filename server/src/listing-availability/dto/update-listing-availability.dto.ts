import { PartialType } from '@nestjs/mapped-types';
import { CreateListingAvailabilityDto } from './create-listing-availability.dto.js';

export class UpdateListingAvailabilityDto extends PartialType(CreateListingAvailabilityDto) {}
