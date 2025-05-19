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
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(@Inject() private readonly CoursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of courses',
    type: [CourseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'No courses found',
  })
  findAll(): Promise<Array<CourseDto>> {
    return this.CoursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific course by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the course to retrieve',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the course details',
    type: CourseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Course not found',
  })
  findOne(@Param('id') id: number): Promise<CourseDto | null> {
    return this.CoursesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update course details by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the course to update',
    type: Number,
  })
  @ApiBody({
    description: 'The course data to update',
    type: UpdateCourseDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the course',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  updateOne(@Body() course: UpdateCourseDto, @Param('id') id: number) {
    return this.CoursesService.updateOne(id, course);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiBody({
    description: 'The course data to create',
    type: CreateCourseDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created the course',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request due to invalid data',
  })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.CoursesService.create(createCourseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific course by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the course to delete',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the course',
  })
  @ApiResponse({
    status: 404,
    description: 'Course not found',
  })
  deleteOne(@Param('id') id: number) {
    return this.CoursesService.deleteOne(id);
  }
}
