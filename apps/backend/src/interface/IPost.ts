import { IMessage } from './IMessage';
import { IUser } from './IUser';
import { IWithLinks } from './IWithLinks';

export interface IPost {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  user?: IUser;
  messages?: IMessage[];
  commentsCount?: number;
  lastCommentDate?: Date;
}

export interface IPostWithLinks extends IPost, IWithLinks {}
