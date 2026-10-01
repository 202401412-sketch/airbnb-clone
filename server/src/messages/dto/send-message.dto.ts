import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class SendMessageDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  conversationId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  recipientId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  listingId?: number;

  @IsOptional()
  @IsString()
  messageText?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  senderId?: number;
}
