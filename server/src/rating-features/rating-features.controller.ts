import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingFeaturesService } from './rating-features.service.js';
import { CreateRatingFeatureDto } from './dto/create-rating-feature.dto.js';
import { UpdateRatingFeatureDto } from './dto/update-rating-feature.dto.js';

@Controller('rating-features')
export class RatingFeaturesController {
  constructor(private readonly ratingFeaturesService: RatingFeaturesService) {}

  @Post()
  create(@Body() createRatingFeatureDto: CreateRatingFeatureDto) {
    return this.ratingFeaturesService.create(createRatingFeatureDto);
  }

  @Get()
  findAll() {
    return this.ratingFeaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingFeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingFeatureDto: UpdateRatingFeatureDto) {
    return this.ratingFeaturesService.update(+id, updateRatingFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingFeaturesService.remove(+id);
  }
}
