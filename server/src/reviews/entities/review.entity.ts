import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  propertyId: number;

  @Column('float')
  rating: number;

  @Column('text')
  comment: string;

  @Column({ nullable: true })
  hostReply: string;

  @CreateDateColumn()
  createdAt: Date;
}