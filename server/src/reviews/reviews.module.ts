import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service.js';
import { ReviewsController } from './reviews.controller.js';
import { Review } from './entities/review.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService, TypeOrmModule],
})
export class ReviewsModule {}