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

  @IsNotEmpty()
  courseCategories: Array<string>; //FIXME: Use Array<CourseCategory> instead.
}
