import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';

@Injectable()
export class AdminService {
  // 1. GET /api/admin/users
  async getAllUsers() {
    return [
      { id: 1, name: 'User 1', email: 'user1@example.com', isBlocked: false },
      { id: 2, name: 'User 2', email: 'user2@example.com', isBlocked: true },
    ];
  }

  // 2. PATCH /api/admin/users/:id/block
  async toggleBlockUser(id: number) {
    return { id, isBlocked: true, message: `User ${id} status updated successfully` };
  }

  // 3. GET /api/admin/properties/pending
  async getPendingProperties() {
    return [
      { id: 101, title: 'Luxury Villa', status: 'pending', hostId: 5 },
    ];
  }

  // 4. PATCH /api/admin/properties/:id/approve
  async approveProperty(id: number) {
    return { id, status: 'approved', message: `Property ${id} approved successfully` };
  }

  // 5. GET /api/admin/stats
  async getStats() {
    return {
      totalRevenue: 25400,
      totalBookings: 180,
      totalUsers: 520,
      totalProperties: 95,
    };
  }

  // 6. GET /api/admin/bookings
  async getAllBookings() {
    return [
      { id: 1, propertyId: 101, userId: 1, totalAmount: 450, status: 'confirmed' },
    ];
  }

  // 7. GET /api/categories
  async getCategories() {
    return [
      { id: 1, name: 'Beachfront' },
      { id: 2, name: 'Cabins' },
      { id: 3, name: 'Mansions' },
    ];
  }

  // 8. POST /api/categories
  async createCategory(dto: CreateCategoryDto) {
    return { id: Date.now(), name: dto.name };
  }
}