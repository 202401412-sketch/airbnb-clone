import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistsService } from './wishlists.service.js';
import { WishlistsController } from './wishlists.controller.js';
import { Wishlist } from './entities/wishlist.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
  exports: [WishlistsService],
})
export class WishlistsModule {}