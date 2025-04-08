import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CoursesService } from "src/services/courses.service";
import { Course } from "src/types/course.type";
import { CourseDto } from "../dto/course.dto";

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
  create(@Body createCourseDto: CourseDto) {
    return this.CoursesService.create(createCourseDto);
  }

  @Delete(':id')
  deleteOne(@Param ('id') id: number) {
    return this.CoursesService.deleteOne(id);
  }
}
