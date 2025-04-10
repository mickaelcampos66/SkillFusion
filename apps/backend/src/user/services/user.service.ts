import * as bcrypt from 'bcryptjs';
import { PrismaUser } from '../../type/prisma';
import { ApiResponse } from 'src/common/ApiResponse';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserWithLinks } from '../../interface/IUser';
import { PaginationLinksType } from 'src/type/PaginationLinksType';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;

      const [users, totalCount] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          skip,
          take: limit,
        }),
        this.prisma.user.count(),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      const usersWithLinks: IUserWithLinks[] = users.map((user) => ({
        ...user,
        links: this.buildUserLinks(user),
      }));

      const paginationLinks: PaginationLinksType = this.buildPaginationLinks('/users', page, limit, totalPages);

      return new ApiResponse(
        this.sanitizeUser(usersWithLinks),
        { page, limit, total_count: totalCount, total_pages: totalPages },
        'Users retrieved successfully',
        paginationLinks,
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return new ApiResponse(
      { ...this.sanitizeUser(user), links: this.buildUserLinks(user) },
      undefined,
      `User ${id} retrieved successfully`,
    );
  }

  async create(dto: CreateUserDto) {
    try {
      const existingUser  = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (existingUser ) {
        throw new BadRequestException(`Email "${dto.email}" is already in use`);
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          firstname: dto.firstname,
          lastname: dto.lastname,
          email: dto.email,
          password: hashedPassword,
          phone_number: dto.phone_number ?? null,
          address: dto.address ?? null,
          role: dto.role_id ? { connect: { id: dto.role_id } } : { connect: { id: 1 } },
        },
      });

      return new ApiResponse(
        { ...this.sanitizeUser(user), links: this.buildUserLinks(user) },
        undefined,
        'User created successfully',
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    try {
      await this.findOne(id);
      const updated = await this.prisma.user.update({
        where: { id },
        data: dto,
      });

      return new ApiResponse(
        { ...this.sanitizeUser(updated), links: this.buildUserLinks(updated) },
        undefined,
        'User updated successfully',
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.prisma.user.delete({ where: { id } });

      return new ApiResponse(undefined, undefined, `User ${id} deleted successfully`);
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : JSON.stringify(error));
    }
  }

  private buildUserLinks(user: PrismaUser) {
    return {
      self: `/users/${user.id}`,
      role: `/roles/${user.role_id}`,
    };
  }

  private buildPaginationLinks(baseUrl: string, page: number, limit: number, totalPages: number) {
    const buildLink = (p: number) => `${baseUrl}?page=${p}&limit=${limit}`;
    return {
      first: buildLink(1),
      previous: page > 1 ? buildLink(page - 1) : null,
      next: page < totalPages ? buildLink(page + 1) : null,
      last: buildLink(totalPages),
    };
  }

  private sanitizeUser(user: PrismaUser | PrismaUser[]) {
    if (Array.isArray(user)) {
      return user.map(({ password, ...userWithoutPwd }) => userWithoutPwd);
    }
    const { password, ...userWithoutPwd } = user;
    return userWithoutPwd;
  }

  private handleError(error: unknown) {
    throw error instanceof Error
      ? new BadRequestException(error.message)
      : new BadRequestException(JSON.stringify(error));
  }
}
