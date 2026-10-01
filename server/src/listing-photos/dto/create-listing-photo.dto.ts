import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateListingPhotoDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsOptional()
  isCover?: boolean = false;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  order?: number = 0;

  @IsString()
  @IsNotEmpty()
  listingId: string;
}
