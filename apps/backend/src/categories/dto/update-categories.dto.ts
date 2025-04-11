import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CategoryEntity } from '../entities/category.entity';

export class UpdateCategoriesDto extends PartialType(
  OmitType(CategoryEntity, ['id']),
) {}
