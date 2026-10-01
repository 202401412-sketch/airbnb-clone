import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ name: 'guest_id', type: 'int', nullable: true })
  guestId: number;

  @Index()
  @Column({ name: 'host_id', type: 'int', nullable: true })
  hostId: number;

  @Index()
  @Column({ name: 'listing_id', type: 'int', nullable: true })
  listingId: number;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: true,
  })
  messages: Message[];
}
