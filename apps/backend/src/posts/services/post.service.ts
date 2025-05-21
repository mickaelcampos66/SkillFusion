import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { IApiResponse } from 'src/interface/IApiResponse';
import { IPost, IPostWithLinks } from 'src/interface/IPost';
import { PrismaService } from 'src/prisma.service';
import { ApiResponse } from 'src/common/ApiResponse';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPostDto: CreatePostDto,
  ): Promise<IApiResponse<IPost> | undefined> {
    try {
      const post = await this.prisma.post.create({
        data: createPostDto,
      });
      return new ApiResponse(post, undefined, 'Post created successfully');
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<IApiResponse<IPostWithLinks[]> | undefined> {
    try {
      const skip = (page - 1) * limit;
      const [posts, totalCount] = await this.prisma.$transaction([
        this.prisma.post.findMany({
          skip,
          take: limit,
        }),
        this.prisma.post.count(),
      ]);

      const totalPages = Math.ceil(totalCount / limit);
      if (page > totalPages && totalPages > 0) {
        throw new NotFoundException(`Page ${page.toString()} out of range.`);
      }
      const postsWithLinks: IPostWithLinks[] = posts.map((post) => {
        return {
          ...post,
          links: this.buildPostLinks(post),
        };
      });
      const paginationLinks = this.buildPaginationLinks(
        '/posts',
        page,
        limit,
        totalPages,
      );
      return new ApiResponse(
        postsWithLinks,
        { page, limit, total_count: totalCount, total_pages: totalPages },
        'Posts retrieved successfully',
        paginationLinks,
      );
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async findOne(id: number): Promise<IApiResponse<IPostWithLinks> | undefined> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id.toString()} not found`);
      }
      return new ApiResponse(
        {
          ...post,
          links: this.buildPostLinks(post),
        },
        undefined,
        `Post ${id.toString()} retrieved successfully`,
      );
    } catch (error: unknown) {
      this.handleError(error);
    }
  }
  async update(userId: number, id: number, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.findOne(id);
      if (userId !== post?.data.user_id) {
        throw new UnauthorizedException(
          'You are not authorized to update this post',
        );
      }

      const updatedPost = await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
      });

      return new ApiResponse(
        {
          ...updatedPost,
          links: this.buildPostLinks(updatedPost),
        },
        undefined,
        `Post ${id.toString()} updated successfully`,
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(userId: number, id: number) {
    try {
      const post = await this.findOne(id);
      if (userId !== post?.data.user_id) {
        throw new UnauthorizedException(
          'You are not authorized to delete this post',
        );
      }
      await this.prisma.post.delete({
        where: { id },
      });
      return new ApiResponse(
        undefined,
        undefined,
        `Post ${id.toString()} deleted successfully`,
      );
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  private buildPostLinks(post: IPost) {
    return {
      self: `/posts/${post.id.toString()}`,
      user: `/users/${post.user_id.toString()}`,
    };
  }

  private buildPaginationLinks(
    baseUrl: string,
    page: number,
    limit: number,
    totalPages: number,
  ) {
    const buildLink = (p: number) =>
      `${baseUrl}?page=${p.toString()}&limit=${limit.toString()}`;
    return {
      first: buildLink(1),
      previous: page > 1 ? buildLink(page - 1) : null,
      next: page < totalPages ? buildLink(page + 1) : null,
      last: buildLink(totalPages),
    };
  }
  private handleError(error: unknown) {
    throw error instanceof Error
      ? new BadRequestException(error.message)
      : new BadRequestException(JSON.stringify(error));
  }
}
