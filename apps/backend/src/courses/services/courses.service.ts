import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Course } from "../types/course.type";

@Injectable()
export class CoursesService {
  constructor(private readonly PrismaService: PrismaService) {}

  async findAll(): Promise<Array<Course>> {
    return this.PrismaService.course.find({});
  }

  async findOne(id: number): Promise<Course> {
    return this.PrismaService.course.find({ id });
  }

  async deleteOne(id: number): Promise<boolean> {
    return this.PrismaService.course.delete({ id });
  }

  async updateOne(id: number, course: Course): Promise<boolean> {
    return this.PrismaService.course.update({ id }, course);
  }

  async create(course: Course): Promise<Course> {
    return this.PrismaService.course.create(course);
  }
}
