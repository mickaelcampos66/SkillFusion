import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CoursesService } from "src/services/courses.service";
import { Course } from "src/types/course.type";

@Controller('courses')
export class CoursesController {
  constructor(private readonly CoursesService: CoursesService) {}

  @Get()
  findAll(): Array<Course> {
    return this.CoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param ('id') id: number): Course {
    return this.CoursesService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param ('id') id: number) {
    return this.CoursesService.updateOne(id);
  }

  @Post()
  create() {}

  @Delete(':id')
  deleteOne(@Param ('id') id: number) {
    return this.CoursesService.deleteOne(id);
  }
}
