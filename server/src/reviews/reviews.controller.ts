import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';

@Controller('api')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // 1. GET /api/properties/:propertyId/reviews
  @Get('properties/:propertyId/reviews')
  async getPropertyReviews(@Param('propertyId', ParseIntPipe) propertyId: number) {
    return this.reviewsService.findByProperty(propertyId);
  }

  // 2. POST /api/properties/:propertyId/reviews
  @Post('properties/:propertyId/reviews')
  async createReview(
    @Param('propertyId', ParseIntPipe) propertyId: number,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: any,
  ) {
    const userId = req.user?.id || 1;
    return this.reviewsService.createReview(userId, propertyId, createReviewDto);
  }

  // 3. PUT /api/reviews/:id
  @Put('reviews/:id')
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req: any,
  ) {
    const userId = req.user?.id || 1;
    return this.reviewsService.updateReview(id, userId, updateReviewDto);
  }

  // 4. DELETE /api/reviews/:id
  @Delete('reviews/:id')
  async deleteReview(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId = req.user?.id || 1;
    return this.reviewsService.deleteReview(id, userId);
  }

  // 5. POST /api/reviews/:id/reply
  @Post('reviews/:id/reply')
  async replyToReview(
    @Param('id', ParseIntPipe) id: number,
    @Body('reply') reply: string,
    @Req() req: any,
  ) {
    const hostId = req.user?.id || 1;
    return this.reviewsService.replyToReview(id, hostId, reply);
  }

  // 6. GET /api/users/:userId/reviews
  @Get('users/:userId/reviews')
  async getUserReviews(@Param('userId', ParseIntPipe) userId: number) {
    return this.reviewsService.findByUser(userId);
  }
}