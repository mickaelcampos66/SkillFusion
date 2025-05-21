import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseDto } from '../dto/course.dto';
import { CreateCourseDto } from '../dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly PrismaService: PrismaService) {}

  async findAll(): Promise<Array<CourseDto>> {
    return this.PrismaService.course.findMany({});
  }

  async findOne(id: number): Promise<CourseDto | null> {
    return this.PrismaService.course.findUnique({ where: { id } });
  }

  async deleteOne(id: number): Promise<CourseDto | null> {
    return this.PrismaService.course.delete({ where: { id } });
  }

  async updateOne(
    id: number,
    course: UpdateCourseDto,
  ): Promise<CourseDto | null> {
    return this.PrismaService.course.update({ where: { id }, data: course });
  }

  async create(course: CreateCourseDto): Promise<CourseDto> {
    return this.PrismaService.course.create({ data: course });
  }

  async findByCategoryId(categoryId: number): Promise<CourseDto[]> {
    return this.PrismaService.course.findMany({
      where: {
        courseCategories: {
          some: {
            id: categoryId,
          },
        },
      },
      include: {
        courseCategories: {
          include: {
            category: true
          },
        },
      },
    });
  }
}
