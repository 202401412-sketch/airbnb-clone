import { Injectable } from '@nestjs/common';
import { CreateUserPaymentMethodDto } from './dto/create-user-payment-method.dto.js';
import { UpdateUserPaymentMethodDto } from './dto/update-user-payment-method.dto.js';

@Injectable()
export class UserPaymentMethodsService {
  create(createUserPaymentMethodDto: CreateUserPaymentMethodDto) {
    return 'This action adds a new userPaymentMethod';
  }

  findAll() {
    return `This action returns all userPaymentMethods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPaymentMethod`;
  }

  update(id: number, updateUserPaymentMethodDto: UpdateUserPaymentMethodDto) {
    return `This action updates a #${id} userPaymentMethod`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPaymentMethod`;
  }
}
