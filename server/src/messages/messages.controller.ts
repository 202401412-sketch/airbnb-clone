import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller(['api/messages', 'messages'])
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // =============================================================
  // 1. STATIC ROUTES (MUST BE DECLARED BEFORE PARAMETERIZED /:id ROUTES)
  // =============================================================

  // 1. GET /api/messages/conversations — Fetch user's conversation list
  @Get('conversations')
  async findConversations(@Req() req: any) {
    return this.messagesService.findConversations(req.user);
  }

  // 2. GET /api/messages/unread-count — Get total unread messages count
  @Get('unread-count')
  async getUnreadCount(@Req() req: any) {
    return this.messagesService.getUnreadCount(req.user);
  }

  // 3. POST /api/messages/send & POST /api/messages — Send a new message
  @Post('send')
  @HttpCode(HttpStatus.CREATED)
  async sendMessage(@Body() sendMessageDto: SendMessageDto, @Req() req: any) {
    return this.messagesService.sendMessage(sendMessageDto, req.user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async sendMessageRoot(@Body() sendMessageDto: SendMessageDto, @Req() req: any) {
    return this.messagesService.sendMessage(sendMessageDto, req.user);
  }

  // =============================================================
  // 2. PARAMETERIZED ROUTES (/conversations/:id, /:id/read)
  // =============================================================

  // 4. GET /api/messages/conversations/:id — Get messages in a conversation
  @Get('conversations/:id')
  async getConversationMessages(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.messagesService.getConversationMessages(id, req.user);
  }

  // 5. PATCH /api/messages/:id/read — Mark a message as read
  @Patch(':id/read')
  async markAsRead(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.messagesService.markAsRead(id, req.user);
  }

  // 6. DELETE /api/messages/conversations/:id — Delete a conversation
  @Delete('conversations/:id')
  async deleteConversation(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.messagesService.deleteConversation(id, req.user);
  }
}
