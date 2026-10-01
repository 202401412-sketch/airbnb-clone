import { IsNumber, IsNotEmpty } from 'class-validator';

export class AddPropertyDto {
  @IsNumber()
  @IsNotEmpty()
  propertyId: number;
}