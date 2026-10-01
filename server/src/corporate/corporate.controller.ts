import { Controller, Get, Post, Patch, Body, Param, Req } from '@nestjs/common';
import { CorporateService } from './corporate.service';

@Controller('api')
export class CorporateController {
  constructor(private readonly corporateService: CorporateService) {}

  @Post('corporate/register')
  async registerCompany(@Body() body: { name: string; commercialRegister: string; emailDomain: string }) {
    return this.corporateService.registerCompany(body);
  }

  @Post('corporate/employees/invite')
  async inviteEmployee(@Body() body: { email: string; department: string }, @Req() req: any) {
    return this.corporateService.inviteEmployee(body, req);
  }

  @Get('corporate/employees')
  async getEmployees(@Req() req: any) {
    return this.corporateService.getEmployees(req);
  }

  @Post('corporate/bookings')
  async createBooking(@Body() body: { propertyId: string; reason: string; department: string; costCenter: string; dates: string }, @Req() req: any) {
    return this.corporateService.createBooking(body, req);
  }

  @Get('corporate/bookings')
  async getCorporateBookings(@Req() req: any) {
    return this.corporateService.getCorporateBookings(req);
  }

  @Patch('corporate/bookings/:id/approve')
  async approveBooking(@Param('id') id: string, @Req() req: any) {
    return this.corporateService.approveBooking(id, req);
  }

  @Get('corporate/invoices')
  async getInvoices(@Req() req: any) {
    return this.corporateService.getInvoices(req);
  }

  @Get('properties/business-ready')
  async getBusinessReadyProperties() {
    return this.corporateService.getBusinessReadyProperties();
  }
}