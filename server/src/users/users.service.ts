import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
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