import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPaymentMethodDto } from './create-user-payment-method.dto.js';

export class UpdateUserPaymentMethodDto extends PartialType(CreateUserPaymentMethodDto) {}
