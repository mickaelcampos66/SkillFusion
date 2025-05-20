import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  constructor(categoryEntity: Partial<CategoryEntity>) {
    Object.assign(this, categoryEntity);
  }

  @ApiProperty({ description: 'The unique identifier of the category' })
  id: number;

  @ApiProperty({ description: 'The name of the category' })
  name: string;

  @ApiProperty({ description: 'The date when the category was created' })
  created_at: Date;

  @ApiProperty({ description: 'The date when the category was last updated' })
  updated_at: Date;
}
