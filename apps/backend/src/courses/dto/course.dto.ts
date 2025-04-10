import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CourseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  image: string | null;

  @IsDate()
  created_at: Date | null;

  @IsDate()
  updated_at: Date | null;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @IsNotEmpty()
  created_by: number;

  // @IsArray()
  // @IsString({ each: true })
  // courseCategories: string[];
}
