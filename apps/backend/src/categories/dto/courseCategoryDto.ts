import { IsNotEmpty, IsNumber } from 'class-validator';

/**
 * model CourseCategory {
 *   id          Int      @id @default(autoincrement())
 *   course_id   Int
 *   category_id Int
 *   course      Course   @relation(fields: [course_id], references: [id])
 *   category    Category @relation(fields: [category_id], references: [id])
 *
 *   @@unique([course_id, category_id])
 * }
 */

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
