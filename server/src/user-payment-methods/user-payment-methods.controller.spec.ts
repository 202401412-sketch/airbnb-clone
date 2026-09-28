import { Test, TestingModule } from '@nestjs/testing';
import { UserPaymentMethodsController } from './user-payment-methods.controller.js';
import { UserPaymentMethodsService } from './user-payment-methods.service.js';

describe('UserPaymentMethodsController', () => {
  let controller: UserPaymentMethodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPaymentMethodsController],
      providers: [UserPaymentMethodsService],
    }).compile();

    controller = module.get<UserPaymentMethodsController>(UserPaymentMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
