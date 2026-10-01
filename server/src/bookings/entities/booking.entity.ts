import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ name: 'property_id', type: 'varchar' })
  propertyId: string;

  get listingId(): string {
    return this.propertyId;
  }

  @Index()
  @Column({ name: 'guest_id', type: 'varchar', nullable: true })
  guestId: string;

  @Column({ name: 'guest_name', type: 'varchar', nullable: true })
  guestName: string;

  @Index()
  @Column({ name: 'host_id', type: 'int', nullable: true })
  hostId: number;

  @Column({ name: 'check_in', type: 'date' })
  checkIn: Date;

  @Column({ name: 'check_out', type: 'date' })
  checkOut: Date;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ name: 'guests_count', type: 'int', default: 1, nullable: true })
  guestsCount: number;

  @Index()
  @Column({
    type: 'varchar',
    default: BookingStatus.CONFIRMED,
  })
  status: BookingStatus;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
