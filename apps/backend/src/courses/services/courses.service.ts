import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseDto } from '../dto/course.dto';
import { CreateCourseDto } from '../dto/create-course.dto';
import { ICourse } from 'src/interface/ICourse';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Injectable()
export class CoursesService {
  constructor(private readonly PrismaService: PrismaService) {}

  private mapCourseToDto(course: ICourse): CourseDto {
    const { courseCategories, created_at, updated_at, ...courseDetails } =
      course;

    return {
      ...courseDetails,
      created_at: created_at ?? null,
      updated_at: updated_at ?? null,
      categories: Array.isArray(courseCategories)
        ? courseCategories.map((cc) => new CategoryEntity(cc.category))
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
    return courses.map((course) => this.mapCourseToDto(course));
  }

  async findAllByUserId(userId: number): Promise<CourseDto[]> {
    const courses = await this.PrismaService.course.findMany({
      where: { created_by: userId },
      include: {
        courseCategories: {
          include: { category: true },
        },
      },
    });
    return courses.map((course) => this.mapCourseToDto(course));
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

  async updateOne(
    id: number,
    course: UpdateCourseDto,
  ): Promise<CourseDto | null> {
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
    return { ...newCourse, categories: [] };
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
    return courses.map((course) => this.mapCourseToDto(course));
  }
}
