import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * model Category {
 *   id               Int              @id @default(autoincrement())
 *   name             String           @unique
 *   courseCategories CourseCategory[]
 * }
 */

export class CategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  // TODO: Is needed?
  // @IsNotEmpty()
  // courseCategories: Array<CourseCategoryDto>;
}
