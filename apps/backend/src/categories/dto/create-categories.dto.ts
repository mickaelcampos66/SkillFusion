import { OmitType } from '@nestjs/mapped-types';

import { CategoryDto } from './category.dto';

export class CreateCategoriesDto extends OmitType(CategoryDto, ['id']) {}
