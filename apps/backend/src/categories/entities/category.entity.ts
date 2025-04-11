export class CategoryEntity {
  constructor(categoryEntity: CategoryEntity) {
    Object.assign(this, categoryEntity);
  }

  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
