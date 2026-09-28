import { PartialType } from '@nestjs/mapped-types';
import { CreateCancellationDto } from './create-cancellation.dto.js';

export class UpdateCancellationDto extends PartialType(CreateCancellationDto) {}
