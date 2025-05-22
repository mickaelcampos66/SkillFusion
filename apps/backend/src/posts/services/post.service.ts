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
import { Request } from 'express';
import { IVerifiedToken } from 'src/interface/IVerifiedToken';
import { JwtUtil } from 'src/utils/jwt.util';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtUtil: JwtUtil,
  ) {}

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

  async update(request: Request, id: number, updatePostDto: UpdatePostDto) {
    try {
      const userId = this.getUserIdFromRequest(request);
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

  async remove(request: Request, id: number) {
    try {
      const userId = this.getUserIdFromRequest(request);
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

  private getUserIdFromRequest(request: Request): number {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    let decoded: IVerifiedToken;
    try {
      decoded = this.jwtUtil.verify(token);
    } catch (_err) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (!decoded.sub) {
      throw new UnauthorizedException('Token is missing user ID');
    }

    return decoded.sub;
  }
}
