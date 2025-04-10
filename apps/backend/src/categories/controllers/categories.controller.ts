import { Body, Controller, Param } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly CategoriesService: CategoriesService) {}

  findAll(): Promise<Array<CategoryDto>> {
    return this.CategoriesService.findAll();
  }

  findOne(@Param('id') id: number): Promise<CategoryDto> {
    return this.CategoriesService.findOne(id);
  }

  updateOne(
    @Param('id') id: number,
    @Body() categories: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.CategoriesService.updateOne(id, categories);
  }

  create(@Body() categories: CreateCategoryDto): Promise<CategoryDto> {
    return this.CategoriesService.create(categories);
  }

  deleteOne(@Param('id') id: number): Promise<boolean> {
    return this.CategoriesService.deleteOne(id);
  }
}
