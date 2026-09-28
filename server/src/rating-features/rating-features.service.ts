import { Injectable } from '@nestjs/common';
import { CreateRatingFeatureDto } from './dto/create-rating-feature.dto.js';
import { UpdateRatingFeatureDto } from './dto/update-rating-feature.dto.js';

@Injectable()
export class RatingFeaturesService {
  create(createRatingFeatureDto: CreateRatingFeatureDto) {
    return 'This action adds a new ratingFeature';
  }

  findAll() {
    return `This action returns all ratingFeatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ratingFeature`;
  }

  update(id: number, updateRatingFeatureDto: UpdateRatingFeatureDto) {
    return `This action updates a #${id} ratingFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} ratingFeature`;
  }
}
