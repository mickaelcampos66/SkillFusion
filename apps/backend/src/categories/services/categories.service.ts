import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryDto } from '../dto/category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly PrismaService: PrismaService) {}

  async findAll(): Promise<Array<CategoryDto>> {
    return this.PrismaService.category.findMany({});
  }

  async findOne(id: number): Promise<CategoryDto | null> {
    return this.PrismaService.category.findOne({ where: { id } });
  }

  async updateOne(
    id: number,
    categories: UpdateCategoryDto,
  ): Promise<CategoryDto | null> {
    return this.PrismaService.category.update({
      where: { id },
      data: categories,
    });
  }

  async create(categories: CreateCategoryDto): Promise<CategoryDto | null> {
    return this.PrismaService.category.create({ data: categories });
  }

  async deleteOne(id: number): Promise<boolean> {
    // InternalServerErrorException
    const deleteTask: CategoryDto = await this.PrismaService.category.delete({
      where: { id },
    });
    return !!deleteTask;
  }
}
