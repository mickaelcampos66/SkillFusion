import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CourseDto } from '../dto/course.dto';
import { CoursesService } from '../services/courses.service';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CreateCourseDto } from '../dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(@Inject() private readonly CoursesService: CoursesService) {}

  @Get()
  findAll(): Promise<Array<CourseDto>> {
    return this.CoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CourseDto | null> {
    return this.CoursesService.findOne(id);
  }

  @Put(':id')
  updateOne(@Body() course: UpdateCourseDto, @Param('id') id: number) {
    return this.CoursesService.updateOne(id, course);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.CoursesService.create(createCourseDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.CoursesService.deleteOne(id);
  }
}
