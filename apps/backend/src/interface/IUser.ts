import { ICourse } from "./ICourse";
import { IMessage } from "./IMessage";
import { IPost } from "./IPost";
import { IRole } from "./IRole";
import { IWithLinks } from "./IWithLinks";

export interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone_number?: string | null;
    address?: string | null;
    role_id: number;
    role?: IRole;
    posts?: IPost[];
    messages?: IMessage[];
    courses?: ICourse[];
}
  
export interface IUserWithLinks extends IUser, IWithLinks {}
