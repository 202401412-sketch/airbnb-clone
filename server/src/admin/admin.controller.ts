import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';

@Controller('api')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // 1. GET /api/admin/users
  @Get('admin/users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  // 2. PATCH /api/admin/users/:id/block
  @Patch('admin/users/:id/block')
  async toggleBlockUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.toggleBlockUser(id);
  }

  // 3. GET /api/admin/properties/pending
  @Get('admin/properties/pending')
  async getPendingProperties() {
    return this.adminService.getPendingProperties();
  }

  // 4. PATCH /api/admin/properties/:id/approve
  @Patch('admin/properties/:id/approve')
  async approveProperty(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.approveProperty(id);
  }

  // 5. GET /api/admin/stats
  @Get('admin/stats')
  async getStats() {
    return this.adminService.getStats();
  }

  // 6. GET /api/admin/bookings
  @Get('admin/bookings')
  async getAllBookings() {
    return this.adminService.getAllBookings();
  }

  // 7. GET /api/categories
  @Get('categories')
  async getCategories() {
    return this.adminService.getCategories();
  }

  // 8. POST /api/categories
  @Post('categories')
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.adminService.createCategory(dto);
  }
}