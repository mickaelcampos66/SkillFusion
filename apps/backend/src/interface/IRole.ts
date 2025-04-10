import { IUser } from "./IUser";
import { IWithLinks } from "./IWithLinks";

export interface IRole {
    id: number;
    name: string;
    users: IUser[];
  }
  
export interface IRoleWithLinks extends IRole, IWithLinks {}
