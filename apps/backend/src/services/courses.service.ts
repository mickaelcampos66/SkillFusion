import { Injectable } from "@nestjs/common";
import { Course } from "src/types/course.type";
import { PrismaService } from "./prisma.service";

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Array<Course> {
    // return this.prisma;
    return null;
  }

  async findOne(id: number): Course {

  }

  async deleteOne(id: number): boolean {

  }

  async updateOne(id: number, course: Course): boolean {

  }
}
