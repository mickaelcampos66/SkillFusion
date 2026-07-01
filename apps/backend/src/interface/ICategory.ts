import { ICourseCategory } from './ICourseCategory';
import { IWithLinks } from './IWithLinks';

export interface ICategory {
  id: number;
  name: string;
  courseCategories?: ICourseCategory[];
}

export interface ICategoryWithLinks extends ICategory, IWithLinks {}
