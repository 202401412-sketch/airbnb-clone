import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  // 1. GET /api/properties/:propertyId/reviews
  async findByProperty(propertyId: number) {
    return this.reviewRepository.find({
      where: { propertyId },
      order: { createdAt: 'DESC' },
    });
  }

  // 2. POST /api/properties/:propertyId/reviews
  async createReview(userId: number, propertyId: number, createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create({
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
      userId,
      propertyId,
    });
    return this.reviewRepository.save(review);
  }

  // 3. PUT /api/reviews/:id
  async updateReview(id: number, userId: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne({ where: { id, userId } });
    if (!review) {
      throw new NotFoundException('Review not found or unauthorized');
    }
    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  // 4. DELETE /api/reviews/:id
  async deleteReview(id: number, userId: number) {
    const review = await this.reviewRepository.findOne({ where: { id, userId } });
    if (!review) {
      throw new NotFoundException('Review not found or unauthorized');
    }
    return this.reviewRepository.remove(review);
  }

  // 5. POST /api/reviews/:id/reply
  async replyToReview(id: number, hostId: number, reply: string) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    review.hostReply = reply;
    return this.reviewRepository.save(review);
  }

  // 6. GET /api/users/:userId/reviews
  async findByUser(userId: number) {
    return this.reviewRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}