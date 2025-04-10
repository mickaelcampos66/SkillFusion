import { PartialType } from '@nestjs/mapped-types';
import { CourseDto } from './course.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCourseDto extends PartialType(CourseDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
