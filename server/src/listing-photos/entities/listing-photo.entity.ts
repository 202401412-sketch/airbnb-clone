import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Listing } from '../../listings/entities/listing.entity.js';

@Entity('listing_photos')
export class ListingPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ default: false })
  isCover: boolean;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Index()
  @Column({ nullable: false })
  listingId: string;

  @ManyToOne(() => Listing, (listing) => listing.photos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'listingId' })
  listing: Listing;

  @CreateDateColumn()
  createdAt: Date;
}
