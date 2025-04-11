import { IsNotEmpty, IsNumber } from 'class-validator';

export class CourseCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  course_id: number;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  course: any; // FIXME: USE of a future definition, CourseDto
}
