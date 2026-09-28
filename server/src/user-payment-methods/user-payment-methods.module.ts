import { Module } from '@nestjs/common';
import { UserPaymentMethodsService } from './user-payment-methods.service.js';
import { UserPaymentMethodsController } from './user-payment-methods.controller.js';

@Module({
  controllers: [UserPaymentMethodsController],
  providers: [UserPaymentMethodsService],
})
export class UserPaymentMethodsModule {}
