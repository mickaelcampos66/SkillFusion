import { CoursesController } from '../controllers/courses.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth/services/auth.service';

describe('CoursesController', () => {
  let coursesController: CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    coursesController = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(coursesController).toBeDefined();
  });
});
