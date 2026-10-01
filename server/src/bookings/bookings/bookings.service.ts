import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from '../entities/booking.entity';
import { Listing } from '../../listings/entities/listing.entity';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingQueryDto } from '../dto/booking-query.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Listing)
    readonly listingRepository: Repository<Listing>,
  ) {}

  /**
   * Helper to format Date or string to YYYY-MM-DD
   */
  private formatDate(date: string | Date): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      throw new BadRequestException(`Invalid date value: ${date}`);
    }
    return d.toISOString().split('T')[0];
  }

  /**
   * 1. POST /api/bookings — Create a new booking
   * Includes overlap validation & host/price resolution
   */
  async create(createBookingDto: CreateBookingDto, currentUser?: any): Promise<Booking> {
    const propertyId = String(createBookingDto.propertyId || createBookingDto.listingId);
    if (!propertyId) {
      throw new BadRequestException('propertyId or listingId is required');
    }

    const checkInRaw = createBookingDto.checkIn ?? createBookingDto.startDate;
    const checkOutRaw = createBookingDto.checkOut ?? createBookingDto.endDate;

    if (!checkInRaw || !checkOutRaw) {
      throw new BadRequestException('checkIn and checkOut dates are required');
    }

    const checkInStr = this.formatDate(checkInRaw);
    const checkOutStr = this.formatDate(checkOutRaw);

    const checkInDate = new Date(checkInStr);
    const checkOutDate = new Date(checkOutStr);

    if (checkInDate >= checkOutDate) {
      throw new BadRequestException('checkOut date must be strictly after checkIn date');
    }

    // Overlap validation: check existing confirmed or pending bookings
    const overlapping = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.property_id = :propertyId', { propertyId })
      .andWhere('UPPER(booking.status) IN (:...activeStatuses)', {
        activeStatuses: [BookingStatus.CONFIRMED, BookingStatus.PENDING],
      })
      .andWhere('booking.check_in < :checkOut AND booking.check_out > :checkIn', {
        checkIn: checkInStr,
        checkOut: checkOutStr,
      })
      .getOne();

    if (overlapping) {
      throw new ConflictException(
        `Property is unavailable for the selected dates (${checkInStr} to ${checkOutStr}). A conflicting booking already exists.`,
      );
    }

    // Resolve hostId and totalPrice if not explicitly provided
    let hostId: number | undefined = createBookingDto.hostId
      ? Number(createBookingDto.hostId)
      : undefined;
    let totalPrice = createBookingDto.totalPrice;

    const numericPropertyId = parseInt(propertyId, 10);
    if (!isNaN(numericPropertyId)) {
      const listing = await this.listingRepository.findOne({
        where: { id: String(numericPropertyId) },
      });
      if (listing) {
        const listingHostId = Number(listing.hostId);
        if (!hostId && !isNaN(listingHostId)) hostId = listingHostId;
        if (!totalPrice) {
          const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
          const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
          totalPrice = nights * Number(listing.pricePerNight || 100);
        }
      }
    }

    // Default calculations if still missing
    if (!totalPrice) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      totalPrice = nights * 100;
    }

    const guestId = createBookingDto.guestId || currentUser?.id || 1;
    const guestName =
      createBookingDto.guestName || currentUser?.name || currentUser?.email || 'Guest User';

    const booking = this.bookingRepository.create({
      propertyId,
      guestId,
      guestName,
      hostId: hostId || 1,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice,
      guestsCount: createBookingDto.guestsCount || 1,
      status: createBookingDto.status || BookingStatus.CONFIRMED,
    });

    return this.bookingRepository.save(booking);
  }

  /**
   * 2. GET /api/bookings/my-bookings — Get current user's bookings (as Guest)
   */
  async findMyBookings(currentUser?: any, query?: BookingQueryDto) {
    const page = query?.page && query.page > 0 ? query.page : 1;
    const limit = query?.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const guestId = currentUser?.id || query?.guestId;

    const qb = this.bookingRepository.createQueryBuilder('booking');

    if (guestId) {
      qb.andWhere('booking.guest_id = :guestId', { guestId });
    }

    if (query?.status) {
      qb.andWhere('UPPER(booking.status) = :status', {
        status: query.status.toUpperCase(),
      });
    }

    qb.orderBy('booking.check_in', 'DESC')
      .skip(skip)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  /**
   * 3. GET /api/bookings/host-reservations — Get incoming reservations for current user (as Host)
   */
  async findHostReservations(currentUser?: any, query?: BookingQueryDto) {
    const page = query?.page && query.page > 0 ? query.page : 1;
    const limit = query?.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const hostId = currentUser?.id || query?.hostId;

    const qb = this.bookingRepository.createQueryBuilder('booking');

    if (hostId) {
      qb.andWhere('booking.host_id = :hostId', { hostId });
    }

    if (query?.status) {
      qb.andWhere('UPPER(booking.status) = :status', {
        status: query.status.toUpperCase(),
      });
    }

    qb.orderBy('booking.check_in', 'ASC')
      .skip(skip)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  /**
   * 4. GET /api/bookings/check-availability/:propertyId — Check date range availability
   */
  async checkAvailability(propertyId: string, checkIn?: string, checkOut?: string) {
    const propertyIdStr = String(propertyId);

    // Fetch existing active reservations for date range overview
    const bookedRanges = await this.bookingRepository
      .createQueryBuilder('booking')
      .select([
        'booking.id',
        'booking.check_in',
        'booking.check_out',
        'booking.status',
      ])
      .where('booking.property_id = :propertyId', { propertyId: propertyIdStr })
      .andWhere('UPPER(booking.status) IN (:...activeStatuses)', {
        activeStatuses: [BookingStatus.CONFIRMED, BookingStatus.PENDING],
      })
      .orderBy('booking.check_in', 'ASC')
      .getMany();

    if (checkIn && checkOut) {
      const checkInStr = this.formatDate(checkIn);
      const checkOutStr = this.formatDate(checkOut);

      const conflicting = await this.bookingRepository
        .createQueryBuilder('booking')
        .where('booking.property_id = :propertyId', { propertyId: propertyIdStr })
        .andWhere('UPPER(booking.status) IN (:...activeStatuses)', {
          activeStatuses: [BookingStatus.CONFIRMED, BookingStatus.PENDING],
        })
        .andWhere('booking.check_in < :checkOut AND booking.check_out > :checkIn', {
          checkIn: checkInStr,
          checkOut: checkOutStr,
        })
        .getOne();

      return {
        propertyId: propertyIdStr,
        available: !conflicting,
        checkIn: checkInStr,
        checkOut: checkOutStr,
        conflict: conflicting
          ? {
              id: conflicting.id,
              checkIn: conflicting.checkIn,
              checkOut: conflicting.checkOut,
              status: conflicting.status,
            }
          : null,
        bookedRanges,
      };
    }

    return {
      propertyId: propertyIdStr,
      bookedRanges,
    };
  }

  /**
   * 5. GET /api/bookings/:id — Get specific booking details
   */
  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID #${id} not found`);
    }

    return booking;
  }

  /**
   * 6. PATCH /api/bookings/:id/cancel — Cancel a booking
   */
  async cancel(id: number, currentUser?: any, reason?: string): Promise<Booking> {
    const booking = await this.findOne(id);

    const currentStatus = String(booking.status).toUpperCase();
    if (currentStatus === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking is already cancelled');
    }

    // Ownership check if user context is available
    if (currentUser?.id) {
      const isGuest = booking.guestId && booking.guestId === currentUser.id;
      const isHost = booking.hostId && booking.hostId === currentUser.id;
      if (!isGuest && !isHost) {
        throw new ForbiddenException('You do not have permission to cancel this booking');
      }
    }

    booking.status = BookingStatus.CANCELLED;
    return this.bookingRepository.save(booking);
  }

  /**
   * 7. PATCH /api/bookings/:id/approve — Host approves booking request
   */
  async approve(id: number, currentUser?: any): Promise<Booking> {
    const booking = await this.findOne(id);

    const currentStatus = String(booking.status).toUpperCase();
    if (currentStatus === BookingStatus.CONFIRMED) {
      return booking;
    }

    if (currentStatus === BookingStatus.CANCELLED) {
      throw new BadRequestException('Cannot approve a cancelled booking');
    }

    if (currentStatus === BookingStatus.REJECTED) {
      throw new BadRequestException('Cannot approve a rejected booking');
    }

    // Re-verify no overlap before confirming
    const checkInStr = this.formatDate(booking.checkIn);
    const checkOutStr = this.formatDate(booking.checkOut);

    const overlapping = await this.bookingRepository
      .createQueryBuilder('b')
      .where('b.property_id = :propertyId', { propertyId: booking.propertyId })
      .andWhere('b.id != :id', { id: booking.id })
      .andWhere('UPPER(b.status) = :status', { status: BookingStatus.CONFIRMED })
      .andWhere('b.check_in < :checkOut AND b.check_out > :checkIn', {
        checkIn: checkInStr,
        checkOut: checkOutStr,
      })
      .getOne();

    if (overlapping) {
      throw new ConflictException(
        'Cannot approve: Another booking was already confirmed for these dates.',
      );
    }

    booking.status = BookingStatus.CONFIRMED;
    return this.bookingRepository.save(booking);
  }

  /**
   * 8. PATCH /api/bookings/:id/reject — Host rejects booking request
   */
  async reject(id: number, currentUser?: any, reason?: string): Promise<Booking> {
    const booking = await this.findOne(id);

    const currentStatus = String(booking.status).toUpperCase();
    if (currentStatus === BookingStatus.REJECTED) {
      return booking;
    }

    if (currentStatus === BookingStatus.CANCELLED) {
      throw new BadRequestException('Cannot reject an already cancelled booking');
    }

    booking.status = BookingStatus.REJECTED;
    return this.bookingRepository.save(booking);
  }
}
