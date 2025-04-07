import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CoursesService } from "src/services/courses.service";
import { Course } from "src/types/course.type";

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(): Array<Course> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param ('id') id: number): Course {
    return this.coursesService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param ('id') id: number) {
    return this.coursesService.updateOne(id);
  }

  @Post()
  create() {}

  @Delete(':id')
  deleteOne() {}

}
