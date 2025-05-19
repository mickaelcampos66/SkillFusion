import { IPost } from './IPost';
import { IUser } from './IUser';
import { IWithLinks } from './IWithLinks';

export interface IMessage {
  id: number;
  content: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  user_id: number;
  post_id: number;
  user: IUser;
  post: IPost;
}

export interface IMessageWithLinks extends IMessage, IWithLinks {}
