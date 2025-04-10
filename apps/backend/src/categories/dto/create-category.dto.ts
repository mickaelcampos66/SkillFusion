import { OmitType } from '@nestjs/mapped-types';

import { CategoryDto } from './category.dto';

export class CreateCategoryDto extends OmitType(CategoryDto, ['id']) {}
