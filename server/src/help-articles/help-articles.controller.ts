import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HelpArticlesService } from './help-articles.service.js';
import { CreateHelpArticleDto } from './dto/create-help-article.dto.js';
import { UpdateHelpArticleDto } from './dto/update-help-article.dto.js';

@Controller('help-articles')
export class HelpArticlesController {
  constructor(private readonly helpArticlesService: HelpArticlesService) {}

  @Post()
  create(@Body() createHelpArticleDto: CreateHelpArticleDto) {
    return this.helpArticlesService.create(createHelpArticleDto);
  }

  @Get()
  findAll() {
    return this.helpArticlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpArticlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHelpArticleDto: UpdateHelpArticleDto) {
    return this.helpArticlesService.update(+id, updateHelpArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helpArticlesService.remove(+id);
  }
}
