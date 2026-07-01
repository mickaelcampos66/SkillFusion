import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { Type } from 'class-transformer';

export class CourseDto {
  @ApiProperty({
    description: 'The unique identifier for the course',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @ApiProperty({
    description: 'The name of the course',
    example: 'Introduction to NestJS',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'A brief description of the course',
    example: 'This course provides a comprehensive introduction to NestJS.',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    description: 'The main content or syllabus of the course',
    example:
      'Module 1: Introduction\nModule 2: Basic Setup\nModule 3: Advanced Topics',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({
    description: 'URL or path to the image representing the course (optional)',
    example: 'https://example.com/course-image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string | null;

  @ApiPropertyOptional({
    description: 'The date when the course was created',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  created_at?: Date | null;

  @ApiPropertyOptional({
    description: 'The date when the course was last updated',
    example: '2023-01-15T00:00:00Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  updated_at?: Date | null;

  @ApiProperty({
    description:
      'The level of the course (e.g., Beginner, Intermediate, Advanced)',
    example: 'Intermediate',
  })
  @IsString()
  @IsNotEmpty()
  level!: string;

  @ApiProperty({
    description: 'ID of the user who created the course',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  created_by: number;

  @ApiProperty({
    description: 'List of categories associated with the course',
    type: [CategoryEntity],
    isArray: true,
  })
  @IsArray()
  @Type(() => CategoryEntity)
  categories: CategoryEntity[];
}
