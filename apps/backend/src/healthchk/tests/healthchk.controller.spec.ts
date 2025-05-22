import { Test, TestingModule } from '@nestjs/testing';
import { HealthChkController } from '../controllers/healthchk.controller';
import { HealthChkService } from '../services/healthchk.service';

describe('HealthchkController', () => {
  let controller: HealthChkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthChkController],
      providers: [HealthChkService],
    }).compile();

    controller = module.get<HealthChkController>(HealthChkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
