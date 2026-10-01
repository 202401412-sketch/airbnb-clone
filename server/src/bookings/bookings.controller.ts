import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingQueryDto } from './dto/booking-query.dto';

@Controller(['api/bookings', 'bookings'])
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // =============================================================
  // 1. STATIC & SPECIFIC ROUTES (MUST BE BEFORE /:id ROUTE)
  // =============================================================

  // 1. POST /api/bookings — Create a new booking
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBookingDto: CreateBookingDto, @Req() req: any) {
    return this.bookingsService.create(createBookingDto, req.user);
  }

  // Root GET /api/bookings — Get all bookings or filter by query
  @Get()
  async findAll(@Req() req: any, @Query() query: BookingQueryDto) {
    return this.bookingsService.findMyBookings(req.user, query);
  }

  // 2. GET /api/bookings/my-bookings — Get current user's bookings (as Guest)
  @Get('my-bookings')
  async getMyBookings(@Req() req: any, @Query() query: BookingQueryDto) {
    return this.bookingsService.findMyBookings(req.user, query);
  }

  // 3. GET /api/bookings/host-reservations — Get incoming reservations for current user (as Host)
  @Get('host-reservations')
  async getHostReservations(@Req() req: any, @Query() query: BookingQueryDto) {
    return this.bookingsService.findHostReservations(req.user, query);
  }

  // 4. GET /api/bookings/check-availability/:propertyId — Check date range availability for a property
  @Get('check-availability/:propertyId')
  async checkAvailability(
    @Param('propertyId') propertyId: string,
    @Query('checkIn') checkIn?: string,
    @Query('checkOut') checkOut?: string,
  ) {
    return this.bookingsService.checkAvailability(propertyId, checkIn, checkOut);
  }

  // =============================================================
  // 2. PARAMETRIC ROUTES (/:id)
  // =============================================================

  // 5. GET /api/bookings/:id — Get specific booking details
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const numericId = parseInt(String(id).replace(/#/g, '').trim(), 10);
    return this.bookingsService.findOne(numericId);
  }

  // 6. PATCH /api/bookings/:id/cancel & POST /api/bookings/:id/cancel — Cancel a booking
  @Patch(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(
    @Param('id') id: string,
    @Req() req: any,
    @Body('reason') reason?: string,
  ) {
    const numericId = parseInt(String(id).replace(/#/g, '').trim(), 10);
    return this.bookingsService.cancelBooking(numericId, req.user, reason);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelPost(
    @Param('id') id: string,
    @Req() req: any,
    @Body('reason') reason?: string,
  ) {
    const numericId = parseInt(String(id).replace(/#/g, '').trim(), 10);
    return this.bookingsService.cancelBooking(numericId, req.user, reason);
  }

  // 7. PATCH /api/bookings/:id/approve — Host approves booking request
  @Patch(':id/approve')
  async approve(@Param('id') id: string, @Req() req: any) {
    const numericId = parseInt(String(id).replace(/#/g, '').trim(), 10);
    return this.bookingsService.approve(numericId, req.user);
  }

  // 8. PATCH /api/bookings/:id/reject — Host rejects booking request
  @Patch(':id/reject')
  async reject(
    @Param('id') id: string,
    @Req() req: any,
    @Body('reason') reason?: string,
  ) {
    const numericId = parseInt(String(id).replace(/#/g, '').trim(), 10);
    return this.bookingsService.reject(numericId, req.user, reason);
  }
}
