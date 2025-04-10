import { OmitType } from '@nestjs/mapped-types';
import { CourseDto } from './course.dto';

export class CreateCourseDto extends OmitType(CourseDto, ['id']) {}
