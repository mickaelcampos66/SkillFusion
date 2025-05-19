import { IMessage } from './IMessage';
import { IUser } from './IUser';
import { IWithLinks } from './IWithLinks';

export interface IPost {
  id: number;
  title: string;
  content: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  user_id: number;
  user: IUser;
  messages: IMessage[];
}

export interface IPostWithLinks extends IPost, IWithLinks {}
