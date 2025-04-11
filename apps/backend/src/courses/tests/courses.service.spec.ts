import { PrismaService } from '../../prisma.service';
import { CoursesService } from '../services/courses.service';

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    } as unknown as PrismaService;

    coursesService = new CoursesService(prismaService);
  });
});
