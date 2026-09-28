import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPaymentMethodsService } from './user-payment-methods.service.js';
import { CreateUserPaymentMethodDto } from './dto/create-user-payment-method.dto.js';
import { UpdateUserPaymentMethodDto } from './dto/update-user-payment-method.dto.js';

@Controller('user-payment-methods')
export class UserPaymentMethodsController {
  constructor(private readonly userPaymentMethodsService: UserPaymentMethodsService) {}

  @Post()
  create(@Body() createUserPaymentMethodDto: CreateUserPaymentMethodDto) {
    return this.userPaymentMethodsService.create(createUserPaymentMethodDto);
  }

  @Get()
  findAll() {
    return this.userPaymentMethodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPaymentMethodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPaymentMethodDto: UpdateUserPaymentMethodDto) {
    return this.userPaymentMethodsService.update(+id, updateUserPaymentMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPaymentMethodsService.remove(+id);
  }
}
