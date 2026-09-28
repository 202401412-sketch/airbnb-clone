import { PartialType } from '@nestjs/mapped-types';
import { CreateHelpArticleDto } from './create-help-article.dto.js';

export class UpdateHelpArticleDto extends PartialType(CreateHelpArticleDto) {}
