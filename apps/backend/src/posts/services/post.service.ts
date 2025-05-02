import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { IApiResponse } from 'src/interface/IApiResponse';
import { IPost, IPostWithLinks } from 'src/interface/IPost';
import { PrismaService } from 'src/prisma.service';
import { ApiResponse } from 'src/common/ApiResponse';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPostDto: CreatePostDto): Promise<IApiResponse<IPost> | undefined> {
    try {
      const post = await this.prisma.post.create({
        data: createPostDto,
      });
      return new ApiResponse(
        post,
        undefined,
        'Post created successfully',
      );
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async findAll(page: number, limit: number): Promise<IApiResponse<IPostWithLinks[]> | undefined> {
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
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return new ApiResponse(
        {
          ...post,
          links: this.buildPostLinks(post),
        },
        undefined,
        `Post ${id} retrieved successfully`,
      );
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      const post = await this.prisma.post.delete({
        where: { id },
      });
      return new ApiResponse(
        undefined,
        undefined,
        `Post ${id} deleted successfully`,
      );
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  private buildPostLinks(post: IPost) {
    return {
      self: `/posts/${post.id}`,
      user: `/users/${post.user_id}`,
    };
  }

  private buildPaginationLinks(
    baseUrl: string,
    page: number,
    limit: number,
    totalPages: number,
  ) {
    const buildLink = (p: number) => `${baseUrl}?page=${p}&limit=${limit}`;
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
