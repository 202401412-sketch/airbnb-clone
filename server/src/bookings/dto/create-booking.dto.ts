import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  Min,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BookingStatus } from '../entities/booking.entity';

export class CreateBookingDto {
  @IsNotEmpty()
  propertyId: string | number;

  @IsOptional()
  listingId?: string | number;

  @IsOptional()
  checkIn?: string;

  @IsOptional()
  checkOut?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  totalPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  guestsCount?: number = 1;

  @IsOptional()
  guestId?: string | number;

  @IsOptional()
  userId?: string | number;

  @IsOptional()
  @IsString()
  guestName?: string;

  @IsOptional()
  userName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  guests?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  guestCount?: number;

  @IsOptional()
  startDate?: string;

  @IsOptional()
  endDate?: string;

  @IsOptional()
  property?: any;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  hostId?: number;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
