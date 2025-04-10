import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';
import { UpdateCategoriesDto } from '../dto/update-categories.dto';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoriesDto } from '../dto/create-categories.dto';
import { MessageUtil, MessageUtilType } from '../../utils/message.util';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly CategoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<Array<CategoryDto>> {
    return this.CategoriesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<CategoryDto | MessageUtilType> {
    const category: CategoryDto | null =
      await this.CategoriesService.findOne(id);

    if (!category) {
      return new MessageUtil(404, false, 'Category not found').toJSON();
    }

    return category;
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() categories: UpdateCategoriesDto,
  ): Promise<CategoryDto | MessageUtilType> {
    const category: CategoryDto | null = await this.CategoriesService.updateOne(
      id,
      categories,
    );

    if (!category) {
      return new MessageUtil(404, false, 'Category not found').toJSON();
    }

    return category;
  }

  @Post()
  async create(
    @Body() categories: CreateCategoriesDto,
  ): Promise<CategoryDto | MessageUtilType> {
    const category: CategoryDto | null =
      await this.CategoriesService.create(categories);

    if (!category) {
      return new MessageUtil(
        500,
        false,
        'Unable to create the category',
      ).toJSON();
    }

    return category;
  }

  @Delete(':id') async deleteOne(
    @Param('id') id: number,
  ): Promise<MessageUtilType> {
    const isDeleted: boolean = await this.CategoriesService.deleteOne(id);

    if (isDeleted) {
      return new MessageUtil(200, true, 'Category successfully deleted');
    } else {
      return new MessageUtil(
        400,
        false,
        'Category not found or fail to delete :/',
      ).toJSON();
    }
  }
}
