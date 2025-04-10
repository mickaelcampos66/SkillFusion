import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpdateCategoriesDto } from '../dto/update-categories.dto';
import { CategoryDto } from '../dto/category.dto';
import { CreateCategoriesDto } from '../dto/create-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly PrismaService: PrismaService) {}

  async findAll(): Promise<Array<CategoryDto>> {
    return this.PrismaService.category.findMany({});
  }

  async findOne(id: number): Promise<CategoryDto | null> {
    return this.PrismaService.category.findUnique({ where: { id } });
  }

  async updateOne(
    id: number,
    categories: UpdateCategoriesDto,
  ): Promise<CategoryDto | null> {
    return this.PrismaService.category.update({
      where: { id },
      data: categories,
    });
  }

  async create(categories: CreateCategoriesDto): Promise<CategoryDto | null> {
    return this.PrismaService.category.create({ data: categories });
  }

  async deleteOne(id: number): Promise<boolean> {
    const deleteTask: CategoryDto = await this.PrismaService.category.delete({
      where: { id },
    });

    return !!deleteTask;
  }
}
