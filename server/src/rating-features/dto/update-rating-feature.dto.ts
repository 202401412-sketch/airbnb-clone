import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingFeatureDto } from './create-rating-feature.dto.js';

export class UpdateRatingFeatureDto extends PartialType(CreateRatingFeatureDto) {}
