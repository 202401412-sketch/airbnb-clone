import { Test, TestingModule } from '@nestjs/testing';
import { UserPaymentMethodsService } from './user-payment-methods.service.js';

describe('UserPaymentMethodsService', () => {
  let service: UserPaymentMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPaymentMethodsService],
    }).compile();

    service = module.get<UserPaymentMethodsService>(UserPaymentMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
