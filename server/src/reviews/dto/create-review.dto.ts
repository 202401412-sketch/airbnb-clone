import { IsNumber, IsString, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  propertyId: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}