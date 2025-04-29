import { CoursesController } from '../controllers/courses.controller';
import { CoursesService } from '../services/courses.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CourseDto } from '../dto/course.dto';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

interface MockCoursesService {
  findAll: () => Promise<CourseDto[]>;
  findOne: (id: number) => Promise<CourseDto | null>;
  create: (dto: CreateCourseDto) => Promise<CourseDto>;
  updateOne: (id: number, dto: UpdateCourseDto) => Promise<CourseDto | null>;
  deleteOne: (id: number) => Promise<CourseDto | null>;
}

describe('CoursesController', () => {
  let coursesController: CoursesController;
  let coursesService: MockCoursesService;

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

  const mockCoursesService: MockCoursesService = {
    findAll: jest.fn(() => Promise.resolve([mockCourse])),
    findOne: jest.fn(() => Promise.resolve(mockCourse)),
    create: jest.fn(() => Promise.resolve(mockCourse)),
    updateOne: jest.fn(() => Promise.resolve(mockCourse)),
    deleteOne: jest.fn(() => Promise.resolve(mockCourse)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: mockCoursesService,
        },
      ],
    }).compile();

    coursesController = module.get<CoursesController>(CoursesController);
    coursesService = module.get<CoursesService>(
      CoursesService,
    ) as unknown as MockCoursesService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(coursesController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const result = await coursesController.findAll();
      expect(result).toEqual([mockCourse]);
      expect(coursesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single course by id', async () => {
      const result = await coursesController.findOne(1);
      expect(result).toEqual(mockCourse);
      expect(coursesService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return null if course not found', async () => {
      (coursesService.findOne as jest.Mock).mockResolvedValueOnce(null);
      const result = await coursesController.findOne(999);
      expect(result).toBeNull();
      expect(coursesService.findOne).toHaveBeenCalledWith(999);
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
      const result = await coursesController.create(createCourseDto);
      expect(result).toEqual(mockCourse);
      expect(coursesService.create).toHaveBeenCalledWith(createCourseDto);
    });
  });

  describe('updateOne', () => {
    it('should update and return the updated course', async () => {
      const updateCourseDto: UpdateCourseDto = {
        name: 'Updated Course',
        description: 'Updated Description',
      };
      const result = await coursesController.updateOne(updateCourseDto, 1);
      expect(result).toEqual(mockCourse);
      expect(coursesService.updateOne).toHaveBeenCalledWith(1, updateCourseDto);
    });
  });

  describe('deleteOne', () => {
    it('should delete and return the deleted course', async () => {
      const result = await coursesController.deleteOne(1);
      expect(result).toEqual(mockCourse);
      expect(coursesService.deleteOne).toHaveBeenCalledWith(1);
    });
  });
});
