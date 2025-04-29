import { IUser } from './IUser';
import { IWithLinks } from './IWithLinks';

export interface IRole {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  users?: IUser[];
}

export interface IRoleWithLinks extends IRole, IWithLinks {}
