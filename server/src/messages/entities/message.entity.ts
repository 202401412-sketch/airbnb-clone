import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ name: 'conversation_id', type: 'int' })
  conversationId: number;

  @Index()
  @Column({ name: 'sender_id', type: 'int' })
  senderId: number;

  @Column({ name: 'message_text', type: 'text' })
  messageText: string;

  @Index()
  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;

  @CreateDateColumn({ name: 'sent_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;
}