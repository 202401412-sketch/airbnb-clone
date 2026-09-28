import { Injectable } from '@nestjs/common';
import { CreateHelpArticleDto } from './dto/create-help-article.dto.js';
import { UpdateHelpArticleDto } from './dto/update-help-article.dto.js';

@Injectable()
export class HelpArticlesService {
  create(createHelpArticleDto: CreateHelpArticleDto) {
    return 'This action adds a new helpArticle';
  }

  findAll() {
    return `This action returns all helpArticles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} helpArticle`;
  }

  update(id: number, updateHelpArticleDto: UpdateHelpArticleDto) {
    return `This action updates a #${id} helpArticle`;
  }

  remove(id: number) {
    return `This action removes a #${id} helpArticle`;
  }
}
