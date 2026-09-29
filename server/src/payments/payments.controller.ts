import { Controller, Get, Post, Body, Param, ParseIntPipe, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // 1. POST /api/payments/checkout
  @Post('checkout')
  async createCheckout(@Body() dto: CreatePaymentDto, @Req() req: any) {
    const userId = req.user?.id || 1;
    return this.paymentsService.createCheckout(userId, dto);
  }

  // 2. POST /api/payments/webhook
  @Post('webhook')
  async handleWebhook(@Body() eventData: any) {
    return this.paymentsService.handleWebhook(eventData);
  }

  // 3. GET /api/payments/history
  @Get('history')
  async getHistory(@Req() req: any) {
    const userId = req.user?.id || 1;
    return this.paymentsService.getHistory(userId);
  }

  // 4. GET /api/payments/payouts
  @Get('payouts')
  async getPayouts(@Req() req: any) {
    const hostId = req.user?.id || 1;
    return this.paymentsService.getPayouts(hostId);
  }

  // 5. POST /api/payments/refund/:bookingId
  @Post('refund/:bookingId')
  async requestRefund(@Param('bookingId', ParseIntPipe) bookingId: number, @Req() req: any) {
    const userId = req.user?.id || 1;
    return this.paymentsService.requestRefund(bookingId, userId);
  }
}