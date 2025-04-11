import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CategoryDto } from './category.dto';

export class UpdateCategoriesDto extends PartialType(
  OmitType(CategoryDto, ['id']),
) {}
