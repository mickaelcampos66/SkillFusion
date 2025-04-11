import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CategoryEntity } from '../entities/category.entity';

export class CreateCategoriesDto extends OmitType(CategoryEntity, ['id']) {
  @IsNotEmpty()
  @IsString()
  name: string;
}
