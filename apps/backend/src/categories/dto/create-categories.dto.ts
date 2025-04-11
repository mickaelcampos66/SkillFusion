import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

import { CategoryDto } from './category.dto';

export class CreateCategoriesDto extends OmitType(CategoryDto, ['id']) {
  @IsNotEmpty()
  @IsString()
  name: string;
}
