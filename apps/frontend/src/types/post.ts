import type { Comment } from './comment'
import type { MetaType } from './meta'
import type { PaginationLinksType } from './pagination-links'
import type { User } from './user'

export type PostsResponse = {
  meta?: MetaType
  data: Omit<Post, 'comments'>[]
  links?: PaginationLinksType
}

export type PostResponse = {
  meta?: MetaType
  data: Post
  links?: PaginationLinksType
}

export type Post = {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
  user_id: number
  user: User
  commentsCount?: number
  lastCommentDate?: string
  comments?: Comment[]
}
