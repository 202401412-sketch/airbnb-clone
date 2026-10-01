mport { Controller, Get, Post, Put, Delete, Body, Param, Req, Injectable } from '@nestjs/common';
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  async register(createUserDto: CreateUserDto) {
    return { success: true, message: 'User registered successfully', data: createUserDto };
  }

  async login(loginDto: LoginDto) {
    return { success: true, message: 'Logged in successfully', token: 'mock-jwt-token-xyz', email: loginDto.email };
  }

  async logout(req: any) {
    return { success: true, message: 'Logged out successfully' };
  }

  async refreshToken(refreshToken: string) {
    return { success: true, accessToken: 'new-mock-jwt-token' };
  }

  async forgotPassword(email: string) {
    return { success: true, message: 'Password reset link sent to email' };
  }

  async resetPassword(body: any) {
    return { success: true, message: 'Password has been reset successfully' };
  }

  async getProfile(req: any) {
    return { success: true, data: { id: 1, name: 'Malak Radwan' } };
  }

  async updateProfile(req: any, updateDto: any) {
    return { success: true, message: 'Profile updated successfully', data: updateDto };
  }

  async updateAvatar(req: any, avatarUrl: string) {
    return { success: true, message: 'Avatar updated successfully', avatarUrl };
  }

  async changePassword(req: any, body: any) {
    return { success: true, message: 'Password changed successfully' };
  }

  async deleteAccount(req: any) {
    return { success: true, message: 'Account deleted successfully' };
  }

  async getPublicProfile(id: string) {
    return { success: true, data: { id, name: 'User Public Profile' } };
  }
}

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Post('auth/logout')
  async logout(@Req() req: any) {
    return this.usersService.logout(req);
  }

  @Post('auth/refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.usersService.refreshToken(body.refreshToken);
  }

  @Post('auth/forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return this.usersService.forgotPassword(body.email);
  }

  @Post('auth/reset-password')
  async resetPassword(@Body() body: any) {
    return this.usersService.resetPassword(body);
  }

  @Get('users/me')
  async getProfile(@Req() req: any) {
    return this.usersService.getProfile(req);
  }

  @Put('users/profile')
  async updateProfile(@Req() req: any, @Body() updateDto: any) {
    return this.usersService.updateProfile(req, updateDto);
  }

  @Put('users/avatar')
  async updateAvatar(@Req() req: any, @Body() body: { avatarUrl: string }) {
    return this.usersService.updateAvatar(req, body.avatarUrl);
  }

  @Put('users/change-password')
  async changePassword(@Req() req: any, @Body() body: any) {
    return this.usersService.changePassword(req, body);
  }

  @Delete('users/account')
  async deleteAccount(@Req() req: any) {
    return this.usersService.deleteAccount(req);
  }

  @Get('users/:id/public')
  async getPublicProfile(@Param('id') id: string) {
    return this.usersService.getPublicProfile(id);
  }
}