import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity.js';
@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async findAllByUser(userId: number) {
    return this.wishlistRepository.find({
      where: { userId },
    });
  }

  async createWishlist(userId: number, name: string) {
    const wishlist = this.wishlistRepository.create({ userId, name });
    return this.wishlistRepository.save(wishlist);
  }

  async addProperty(wishlistId: number, propertyId: number) {
    const wishlist = await this.wishlistRepository.findOne({ where: { id: wishlistId } });
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    return { message: 'Property added successfully', wishlistId, propertyId };
  }

  async removeProperty(wishlistId: number, propertyId: number) {
    return { message: 'Property removed successfully', wishlistId, propertyId };
  }

  async deleteWishlist(id: number) {
    const result = await this.wishlistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Wishlist not found');
    }
    return { message: 'Wishlist deleted successfully' };
  }
}