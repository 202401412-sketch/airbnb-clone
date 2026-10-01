import { Controller, Get, Post, Patch, Body, Param, Req, Injectable } from '@nestjs/common';

@Injectable()
export class CorporateService {
  async registerCompany(body: { name: string; commercialRegister: string; emailDomain: string }) {
    return { success: true, message: 'Company registered successfully', data: body };
  }

  async inviteEmployee(body: { email: string; department: string }, req: any) {
    return { success: true, message: `Invitation sent successfully to ${body.email}` };
  }

  async getEmployees(req: any) {
    return { success: true, employees: [{ id: 1, name: 'Ahmed Ali', email: 'ahmed@company.com', department: 'Engineering', status: 'Active' }] };
  }

  async createBooking(body: { propertyId: string; reason: string; department: string; costCenter: string; dates: string }, req: any) {
    return { success: true, message: 'Business travel booking created successfully and pending approval', bookingDetails: body };
  }

  async getCorporateBookings(req: any) {
    return { success: true, bookings: [{ id: 'b1', employee: 'Ahmed Ali', property: 'Downtown Office Suite', costCenter: 'CC-102', status: 'Pending Approval' }] };
  }

  async approveBooking(id: string, req: any) {
    return { success: true, message: `Booking with ID ${id} has been approved successfully` };
  }

  async getInvoices(req: any) {
    return { success: true, month: 'October 2026', totalAmount: '$4,500', invoices: [{ invoiceId: 'INV-001', amount: '$4,500', status: 'Issued' }] };
  }

  async getBusinessReadyProperties() {
    return { success: true, properties: [{ id: 'prop-1', name: 'Executive Business Loft', features: ['Fast Wifi', 'Workstation', 'Self check-in', 'Official Invoices'] }] };
  }
}

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