import { ICourseCategory } from "./ICourseCategory";
import { IUser } from "./IUser";
import { IWithLinks } from "./IWithLinks";

export interface ICourse {
    id: number;
    name: string;
    description: string;
    content: string;
    image?: string | null;
    created_at?: Date | null;
    updated_at?: Date | null;
    level: string;
    created_by: number;
    creator: IUser;
    courseCategories: ICourseCategory[];
}
  
export interface ICourseWithLinks extends ICourse, IWithLinks {}
