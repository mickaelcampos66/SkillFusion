import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CategoryDto } from './category.dto';

export class UpdateCategoryDto extends PartialType(CategoryDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
