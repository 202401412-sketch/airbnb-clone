import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  /**
   * Helper to extract current user ID with fallback
   */
  private getUserId(currentUser?: any): number {
    return currentUser?.id ? Number(currentUser.id) : 1;
  }

  /**
   * 1. GET /api/messages/conversations — Fetch user's conversation list
   */
  async findConversations(currentUser?: any) {
    const userId = this.getUserId(currentUser);

    const conversations = await this.conversationRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.messages', 'm')
      .where('c.guest_id = :userId OR c.host_id = :userId', { userId })
      .orderBy('c.created_at', 'DESC')
      .addOrderBy('m.sent_at', 'ASC')
      .getMany();

    const formatted = conversations.map((conv) => {
      const messages = conv.messages || [];
      const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
      const unreadCount = messages.filter(
        (m) => !m.isRead && m.senderId !== userId,
      ).length;

      return {
        id: conv.id,
        guestId: conv.guestId,
        hostId: conv.hostId,
        listingId: conv.listingId,
        createdAt: conv.createdAt,
        lastMessage,
        unreadCount,
        messagesCount: messages.length,
      };
    });

    return {
      data: formatted,
      meta: {
        total: formatted.length,
      },
    };
  }

  /**
   * 2. GET /api/messages/unread-count — Get total unread messages count
   */
  async getUnreadCount(currentUser?: any) {
    const userId = this.getUserId(currentUser);

    const count = await this.messageRepository
      .createQueryBuilder('m')
      .innerJoin('m.conversation', 'c')
      .where('(c.guest_id = :userId OR c.host_id = :userId)', { userId })
      .andWhere('m.sender_id != :userId', { userId })
      .andWhere('m.is_read = false')
      .getCount();

    return { unreadCount: count };
  }

  /**
   * 3. GET /api/messages/conversations/:id — Get messages in a conversation
   */
  async getConversationMessages(id: number, currentUser?: any) {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID #${id} not found`);
    }

    const messages = await this.messageRepository.find({
      where: { conversationId: id },
      order: { sentAt: 'ASC' },
    });

    // Auto mark received unread messages as read
    const userId = this.getUserId(currentUser);
    const unreadMessageIds = messages
      .filter((m) => !m.isRead && m.senderId !== userId)
      .map((m) => m.id);

    if (unreadMessageIds.length > 0) {
      await this.messageRepository
        .createQueryBuilder()
        .update(Message)
        .set({ isRead: true })
        .whereInIds(unreadMessageIds)
        .execute();

      messages.forEach((m) => {
        if (unreadMessageIds.includes(m.id)) {
          m.isRead = true;
        }
      });
    }

    return {
      conversation,
      messages,
    };
  }

  /**
   * 4. POST /api/messages/send — Send a new message
   */
  async sendMessage(sendMessageDto: SendMessageDto, currentUser?: any) {
    const senderId = sendMessageDto.senderId || this.getUserId(currentUser);
    let conversationId = sendMessageDto.conversationId;

    if (!conversationId) {
      // Find or create conversation with recipient
      const recipientId = sendMessageDto.recipientId || 2;
      const listingId = sendMessageDto.listingId || null;

      let conversation = await this.conversationRepository
        .createQueryBuilder('c')
        .where(
          '((c.guest_id = :senderId AND c.host_id = :recipientId) OR (c.guest_id = :recipientId AND c.host_id = :senderId))',
          { senderId, recipientId },
        )
        .getOne();

      if (!conversation) {
        conversation = this.conversationRepository.create({
          guestId: senderId,
          hostId: recipientId,
          listingId: listingId || undefined,
        });
        conversation = await this.conversationRepository.save(conversation);
      }

      conversationId = conversation.id;
    } else {
      const exists = await this.conversationRepository.findOne({
        where: { id: conversationId },
      });
      if (!exists) {
        throw new NotFoundException(`Conversation with ID #${conversationId} not found`);
      }
    }

    const text =
      sendMessageDto.messageText ||
      sendMessageDto.text ||
      sendMessageDto.message ||
      sendMessageDto.content ||
      '';

    if (!text.trim()) {
      throw new BadRequestException('Message text cannot be empty');
    }

    const message = this.messageRepository.create({
      conversationId,
      senderId,
      messageText: text.trim(),
      isRead: false,
    });

    const savedMessage = await this.messageRepository.save(message);

    return {
      message: 'Message sent successfully',
      data: savedMessage,
      ...savedMessage,
    };
  }

  /**
   * 5. PATCH /api/messages/:id/read — Mark a message as read
   */
  async markAsRead(id: number, currentUser?: any) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID #${id} not found`);
    }

    message.isRead = true;
    const updated = await this.messageRepository.save(message);

    return {
      message: 'Message marked as read',
      data: updated,
    };
  }

  /**
   * 6. DELETE /api/messages/conversations/:id — Delete a conversation
   */
  async deleteConversation(id: number, currentUser?: any) {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID #${id} not found`);
    }

    // Delete associated messages first
    await this.messageRepository.delete({ conversationId: id });
    // Delete conversation
    await this.conversationRepository.delete(id);

    return {
      success: true,
      message: `Conversation #${id} deleted successfully`,
    };
  }
}
