import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpdateCategoriesDto } from '../dto/update-categories.dto';
import { CreateCategoriesDto } from '../dto/create-categories.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly PrismaService: PrismaService) {}

  async findAll(): Promise<Array<CategoryEntity>> {
    return this.PrismaService.category.findMany({});
  }

  async findOne(id: number): Promise<CategoryEntity | null> {
    return this.PrismaService.category.findUnique({ where: { id } });
  }

  async updateOne(
    id: number,
    categories: UpdateCategoriesDto,
  ): Promise<CategoryEntity | null> {
    return this.PrismaService.category.update({
      where: { id },
      data: categories,
    });
  }

  async create(
    categories: CreateCategoriesDto,
  ): Promise<CategoryEntity | null> {
    return this.PrismaService.category.create({ data: categories });
  }

  async deleteOne(id: number): Promise<boolean> {
    const deleteTask: CategoryEntity = await this.PrismaService.category.delete(
      {
        where: { id },
      },
    );

    return !!deleteTask;
  }
}
