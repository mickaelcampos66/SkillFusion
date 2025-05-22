import * as bcrypt from 'bcryptjs';
import { ApiResponse } from '../../common/ApiResponse';
import { PrismaService } from '../../prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  IUser,
  IUserWithLinks,
  IUserWithoutPassword,
} from '../../interface/IUser';
import { PaginationLinksType } from '../../type/PaginationLinksType';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IApiResponse } from 'src/interface/IApiResponse';
import { MetaType } from '../../type/MetaType';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private sanitizeUser(user: IUser): IUserWithoutPassword {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  private buildUserLinks(user: IUserWithoutPassword) {
    return {
      self: `/users/${user.id}`,
      role: `/roles/${user.role_id}`,
    };
  }

  private buildUserWithLinks(user: IUserWithoutPassword): IUserWithLinks {
    return {
      ...user,
      links: this.buildUserLinks(user),
    };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<IApiResponse<IUserWithLinks[]>> {
    try {
      const skip = (page - 1) * limit;

      const [users, totalCount] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          skip,
          take: limit,
        }),
        this.prisma.user.count(),
      ] as const);

      const totalPages = Math.ceil(totalCount / limit);
      const sanitizedUsers = users.map(user => this.sanitizeUser(user));
      const usersWithLinks = sanitizedUsers.map(user => this.buildUserWithLinks(user));

      const meta: MetaType = {
        page,
        limit,
        total_count: totalCount,
        total_pages: totalPages,
      };

      return new ApiResponse(
        usersWithLinks,
        meta,
        'Users retrieved successfully',
      );
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An error occurred while fetching users',
      );
    }
  }

  async findOne(id: number): Promise<IApiResponse<IUserWithLinks>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
    
    if (!user) {
      throw new NotFoundException(`User with id ${id.toString()} not found`);
    }

    const sanitizedUser = this.sanitizeUser(user);
    const userWithLinks = this.buildUserWithLinks(sanitizedUser);

    return new ApiResponse(
      userWithLinks,
      undefined,
      `User ${id.toString()} retrieved successfully`,
    );
  }

  async create(dto: CreateUserDto): Promise<IApiResponse<IUserWithLinks>> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      
      if (existingUser) {
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
          role: dto.role_id
            ? { connect: { id: dto.role_id } }
            : { connect: { id: 1 } },
        },
      });

      const sanitizedUser = this.sanitizeUser(user);
      const userWithLinks = this.buildUserWithLinks(sanitizedUser);

      return new ApiResponse(
        userWithLinks,
        undefined,
        'User created successfully',
      );
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An error occurred while creating user',
      );
    }
  }

  async update(
    id: number,
    dto: UpdateUserDto,
  ): Promise<IApiResponse<IUserWithLinks>> {
    try {
      await this.findOne(id);
      const updated = await this.prisma.user.update({
        where: { id },
        data: dto,
      });

      const sanitizedUser = this.sanitizeUser(updated);
      const userWithLinks = this.buildUserWithLinks(sanitizedUser);

      return new ApiResponse(
        userWithLinks,
        undefined,
        'User updated successfully',
      );
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An error occurred while updating user',
      );
    }
  }

  async remove(id: number): Promise<IApiResponse<void>> {
    try {
      await this.findOne(id);
      await this.prisma.user.delete({ where: { id } });

      return new ApiResponse(
        undefined,
        undefined,
        `User ${id.toString()} deleted successfully`,
      );
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An error occurred while deleting user',
      );
    }
  }
}
