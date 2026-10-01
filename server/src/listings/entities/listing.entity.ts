import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { ListingPhoto } from '../../listing-photos/entities/listing-photo.entity.js';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerNight: number;

  @Index()
  @Column()
  location: string;

  @Column({ nullable: true })
  address: string;

  @Index()
  @Column()
  city: string;

  @Index()
  @Column()
  country: string;

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column('float', { default: 4.85 })
  rating: number;

  @Column({ default: 0 })
  reviewsCount: number;

  @Column({ default: 1 })
  maxGuests: number;

  @Column({ default: 1 })
  bedrooms: number;

  @Column({ default: 1 })
  beds: number;

  @Column({ default: 1 })
  baths: number;

  @Column('simple-array', { nullable: true })
  amenities: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isSuperhost: boolean;

  @Index()
  @Column({ nullable: false })
  hostId: string;

  @Index()
  @Column({ nullable: false })
  categoryId: string;

  @OneToMany(() => ListingPhoto, (photo) => photo.listing, {
    cascade: true,
    eager: true,
  })
  photos: ListingPhoto[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
