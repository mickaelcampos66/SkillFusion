import { Test, TestingModule } from '@nestjs/testing';
import { HealthChkController } from '../controllers/healthchk.controller';

describe('HealthchkController', () => {
  let controller: HealthChkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthChkController],
    }).compile();

    controller = module.get<HealthChkController>(HealthChkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
