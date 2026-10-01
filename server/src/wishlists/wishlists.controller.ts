import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, Req } from '@nestjs/common';
import { WishlistsService } from './wishlists.service.js';
import { CreateWishlistDto } from './dto/create-wishlist.dto.js';
import { AddPropertyDto } from './dto/add-property.dto.js';

@Controller('api/wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async getUserWishlists(@Req() req: any) {
    const userId = req.user?.id || 1;
    return this.wishlistsService.findAllByUser(userId);
  }

  @Post()
  async createWishlist(@Body() createWishlistDto: CreateWishlistDto, @Req() req: any) {
    const userId = req.user?.id || 1;
    return this.wishlistsService.createWishlist(userId, createWishlistDto.name);
  }

  @Post(':id/properties')
  async addPropertyToWishlist(
    @Param('id', ParseIntPipe) wishlistId: number,
    @Body() addPropertyDto: AddPropertyDto,
  ) {
    return this.wishlistsService.addProperty(wishlistId, addPropertyDto.propertyId);
  }

  @Delete(':id/properties/:propertyId')
  async removePropertyFromWishlist(
    @Param('id', ParseIntPipe) wishlistId: number,
    @Param('propertyId', ParseIntPipe) propertyId: number,
  ) {
    return this.wishlistsService.removeProperty(wishlistId, propertyId);
  }

  @Delete(':id')
  async deleteWishlist(@Param('id', ParseIntPipe) wishlistId: number) {
    return this.wishlistsService.deleteWishlist(wishlistId);
  }
}