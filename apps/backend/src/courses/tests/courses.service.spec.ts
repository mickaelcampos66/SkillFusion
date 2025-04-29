import { CoursesService } from '../services/courses.service';
import { CourseDto } from '../dto/course.dto';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { PrismaService } from '../../prisma.service';

interface MockPrismaService {
  course: {
    findMany: (args: any) => Promise<CourseDto[]>;
    findUnique: (args: { where: { id: number } }) => Promise<CourseDto | null>;
    create: (args: { data: CreateCourseDto }) => Promise<CourseDto>;
    update: (args: {
      where: { id: number };
      data: UpdateCourseDto;
    }) => Promise<CourseDto | null>;
    delete: (args: { where: { id: number } }) => Promise<CourseDto | null>;
  };
}

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let prismaService: MockPrismaService;

  const mockCourse: CourseDto = {
    id: 1,
    name: 'Test Course',
    description: 'Test Description',
    content: 'Test Content',
    image: null,
    created_at: new Date(),
    updated_at: new Date(),
    level: 'Beginner',
    created_by: 1,
  };

  beforeEach(() => {
    prismaService = {
      course: {
        findMany: jest.fn(() => Promise.resolve([mockCourse])),
        findUnique: jest.fn(() => Promise.resolve(mockCourse)),
        create: jest.fn(() => Promise.resolve(mockCourse)),
        update: jest.fn(() => Promise.resolve(mockCourse)),
        delete: jest.fn(() => Promise.resolve(mockCourse)),
      },
    };

    coursesService = new CoursesService(
      prismaService as unknown as PrismaService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(coursesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const result = await coursesService.findAll();
      expect(result).toEqual([mockCourse]);
      expect(prismaService.course.findMany).toHaveBeenCalledWith({});
    });
  });

  describe('findOne', () => {
    it('should return a single course by id', async () => {
      const result = await coursesService.findOne(1);
      expect(result).toEqual(mockCourse);
      expect(prismaService.course.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null if course not found', async () => {
      (prismaService.course.findUnique as jest.Mock).mockResolvedValueOnce(
        null,
      );
      const result = await coursesService.findOne(999);
      expect(result).toBeNull();
      expect(prismaService.course.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('create', () => {
    it('should create and return a new course', async () => {
      const createCourseDto: CreateCourseDto = {
        name: 'Test Course',
        description: 'Test Description',
        content: 'Test Content',
        image: null,
        level: 'Beginner',
        created_by: 1,
      };
      const result = await coursesService.create(createCourseDto);
      expect(result).toEqual(mockCourse);
      expect(prismaService.course.create).toHaveBeenCalledWith({
        data: createCourseDto,
      });
    });
  });

  describe('updateOne', () => {
    it('should update and return the updated course', async () => {
      const updateCourseDto: UpdateCourseDto = {
        name: 'Updated Course',
        description: 'Updated Description',
      };
      const result = await coursesService.updateOne(1, updateCourseDto);
      expect(result).toEqual(mockCourse);
      expect(prismaService.course.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateCourseDto,
      });
    });
  });

  describe('deleteOne', () => {
    it('should delete and return the deleted course', async () => {
      const result = await coursesService.deleteOne(1);
      expect(result).toEqual(mockCourse);
      expect(prismaService.course.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
