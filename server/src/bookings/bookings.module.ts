import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { Listing } from '../listings/entities/listing.entity';
<<<<<<< HEAD

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Listing])],
=======
import { Property } from '../properties/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Listing, Property])],
>>>>>>> 04bd5d5 (Merge branch 'main' into feature/homepage-grid)
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
