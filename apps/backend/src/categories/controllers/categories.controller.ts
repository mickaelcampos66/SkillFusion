import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UpdateCategoriesDto } from '../dto/update-categories.dto';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoriesDto } from '../dto/create-categories.dto';
import { MessageUtil, MessageUtilType } from '../../utils/message.util';
import { CategoryEntity } from '../entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly CategoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns all categories',
    type: CategoryEntity,
    isArray: true,
  })
  async findAll(): Promise<Array<CategoryEntity>> {
    const categories = await this.CategoriesService.findAll();
    return categories.map(
      (category: CategoryEntity) => new CategoryEntity(category),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the category',
    type: CategoryEntity,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(
    @Param('id') id: number,
  ): Promise<CategoryEntity | MessageUtilType> {
    const category = (await this.CategoriesService.findOne(
      id,
    )) as CategoryEntity;

    if (!category) {
      return new MessageUtil(404, false, 'Category not found').toJSON();
    }

    return new CategoryEntity(category);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({ name: 'id', type: 'number', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    type: CategoryEntity,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async updateOne(
    @Param('id') id: number,
    @Body() categories: UpdateCategoriesDto,
  ): Promise<CategoryEntity | MessageUtilType> {
    const category = (await this.CategoriesService.updateOne(
      id,
      categories,
    )) as CategoryEntity;

    if (!category) {
      return new MessageUtil(404, false, 'Category not found').toJSON();
    }

    return new CategoryEntity(category);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    type: CategoryEntity,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @Body() categories: CreateCategoriesDto,
  ): Promise<CategoryEntity | MessageUtilType> {
    const category = (await this.CategoriesService.create(
      categories,
    )) as CategoryEntity;

    if (!category) {
      return new MessageUtil(
        500,
        false,
        'Unable to create the category',
      ).toJSON();
    }

    return new CategoryEntity(category);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({ name: 'id', type: 'number', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Category not found or failed to delete',
  })
  async deleteOne(@Param('id') id: number): Promise<MessageUtilType> {
    const isDeleted: boolean = await this.CategoriesService.deleteOne(id);

    if (isDeleted) {
      return new MessageUtil(
        200,
        true,
        'Category successfully deleted',
      ).toJSON();
    } else {
      return new MessageUtil(
        400,
        false,
        'Category not found or fail to delete :/',
      ).toJSON();
    }
  }
}
