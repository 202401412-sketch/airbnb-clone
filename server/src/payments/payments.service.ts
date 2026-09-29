import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

 // 1. POST /api/payments/checkout
 async createCheckout(userId: number, dto: CreatePaymentDto) {
  const payment = this.paymentRepository.create({
    userId,
    bookingId: dto.bookingId,
    amount: dto.amount,
    status: 'completed',
    transactionId: `TXN_${Date.now()}`,
  });
  return this.paymentRepository.save(payment);
}

  // 2. POST /api/payments/webhook
  async handleWebhook(eventData: any) {
    return { received: true, status: 'success' };
  }

  // 3. GET /api/payments/history
  async getHistory(userId: number) {
    return this.paymentRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  // 4. GET /api/payments/payouts
  async getPayouts(hostId: number) {
    return this.paymentRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // 5. POST /api/payments/refund/:bookingId
  async requestRefund(bookingId: number, userId: number) {
    const payment = await this.paymentRepository.findOne({ where: { bookingId, userId } });
    if (!payment) {
      throw new NotFoundException('Transaction not found');
    }
    payment.status = 'refunded';
    return this.paymentRepository.save(payment);
  }
}