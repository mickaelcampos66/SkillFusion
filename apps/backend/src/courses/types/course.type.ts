export interface Course {
  id: number,
  name: string,
  description: string,
  content: string,
  image: string,
  created_at: Date,
  updated_at: Date,
  level: string,
  created_by: number,
  courseCategories: Array<string>, //FIXME: Use CourseCategory type
  creator: any, //FIXME: Create User type
}
