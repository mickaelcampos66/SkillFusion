import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseDto } from '../dto/course.dto';
import { CreateCourseDto } from '../dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly PrismaService: PrismaService) {}

  private mapCourseToDto(course: any): CourseDto {
    return {
      ...course,
      categoryIds: course.courseCategories
        ? course.courseCategories.map((cc) => cc.category.id)
        : [],
    };
  }

  async findAll(): Promise<CourseDto[]> {
    const courses = await this.PrismaService.course.findMany({
      include: {
        courseCategories: {
          include: { category: true },
        },
      },
    });
    return courses.map(this.mapCourseToDto);
  }

  async findOne(id: number): Promise<CourseDto | null> {
    const course = await this.PrismaService.course.findUnique({
      where: { id },
      include: {
        courseCategories: {
          include: { category: true },
        },
      },
    });
    if (!course) return null;
    return this.mapCourseToDto(course);
  }

  async deleteOne(id: number): Promise<CourseDto | null> {
    const course = await this.PrismaService.course.delete({
      where: { id },
      include: {
        courseCategories: {
          include: { category: true },
        },
      },
    });
    return this.mapCourseToDto(course);
  }

  async updateOne(id: number, course: UpdateCourseDto): Promise<CourseDto | null> {
    const updatedCourse = await this.PrismaService.course.update({
      where: { id },
      data: course,
      include: {
        courseCategories: {
          include: { category: true },
        },
      },
    });
    return this.mapCourseToDto(updatedCourse);
  }

  async create(course: CreateCourseDto): Promise<CourseDto> {
    const newCourse = await this.PrismaService.course.create({ data: course });
    return { ...newCourse, categoryIds: [] };
  }

  async findByCategoryId(categoryId: number): Promise<CourseDto[]> {
    const courses = await this.PrismaService.course.findMany({
      where: {
        courseCategories: {
          some: {
            category_id: categoryId,
          },
        },
      },
      include: {
        courseCategories: {
          include: { category: true },
        },
      },
    });
    return courses.map(this.mapCourseToDto);
  }
}
