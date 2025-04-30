import { Test, TestingModule } from '@nestjs/testing';
import { HealthChkService } from '../services/healthchk.service';

describe('HealthchkService', () => {
  let service: HealthChkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthChkService],
    }).compile();

    service = module.get<HealthChkService>(HealthChkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
