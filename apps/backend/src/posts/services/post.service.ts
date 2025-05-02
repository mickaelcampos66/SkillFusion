import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { IApiResponse } from 'src/interface/IApiResponse';
import { IPost, IPostWithLinks } from 'src/interface/IPost';
import { PrismaService } from 'src/prisma.service';
import { ApiResponse } from 'src/common/ApiResponse';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
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
      {
        this.handleError(error);
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
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
