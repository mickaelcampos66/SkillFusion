import { ICategory } from './ICategory';
import { ICourse } from './ICourse';

export interface ICourseCategory {
  id: number;
  course_id: number;
  category_id: number;
  course: ICourse;
  category: ICategory;
}
