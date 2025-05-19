import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'The name of the course',
    example: 'Introduction to NestJS',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A brief description of the course content',
    example: 'This course provides a comprehensive introduction to NestJS.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The main content or syllabus of the course',
    example:
      'Module 1: Introduction\nModule 2: Basic Setup\nModule 3: Advanced Topics',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'URL or path to the image representing the course (optional)',
    example: 'https://example.com/course-image.jpg',
    required: false,
  })
  @IsString()
  image: string | null;

  @ApiProperty({
    description:
      'The level of the course (e.g., Beginner, Intermediate, Advanced)',
    example: 'Intermediate',
  })
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty({
    description: 'ID of the user who created the course',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  created_by: number;

  // @IsArray()
  // @IsString({ each: true })
  // courseCategories: string[];
}
